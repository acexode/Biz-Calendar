/* eslint-disable @typescript-eslint/member-ordering */
import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    Injectable,
    Input,
    LOCALE_ID,
    OnChanges,
    Output,
    SimpleChanges,
  } from '@angular/core';
  import {
    CalendarDayViewBeforeRenderEvent,
    CalendarUtils,
    CalendarWeekViewBeforeRenderEvent,
    CalendarWeekViewComponent,
    DateAdapter,
    getWeekViewPeriod,
  } from 'angular-calendar';
  import {
    WeekView,
    GetWeekViewArgs,
    WeekViewTimeEvent,
    EventColor,
    CalendarEvent,
    WeekViewAllDayEventRow,
    WeekViewAllDayEvent,
  } from 'calendar-utils';
  import { DragEndEvent, DragMoveEvent } from 'angular-draggable-droppable';
import { format } from 'date-fns';
import { ro } from 'date-fns/locale';

  export interface User {
    id: number;
    name: string;
    title: string;
    color: EventColor;
  }

  interface DayViewScheduler extends WeekView {
    users: User[];
  }

  interface GetWeekViewArgsWithUsers extends GetWeekViewArgs {
    users: User[];
  }

  @Injectable()
  export class DayViewSchedulerCalendarUtils extends CalendarUtils {
    getWeekView(args: GetWeekViewArgsWithUsers): DayViewScheduler {
      const { period } = super.getWeekView(args);
      const view: DayViewScheduler = {
        period,
        allDayEventRows: [],
        hourColumns: [],
        users: [...args.users],
      };

      view.users.forEach((user, columnIndex) => {
        const events = args.events.filter(
          (event) => event.meta.user.id === user.id
        );
        const columnView = super.getWeekView({
          ...args,
          events,
        });
        view.hourColumns.push(columnView.hourColumns[0]);
        columnView.allDayEventRows.forEach(({ row }, rowIndex) => {
          view.allDayEventRows[rowIndex] = view.allDayEventRows[rowIndex] || {
            row: [],
          };
          view.allDayEventRows[rowIndex].row.push({
            ...row[0],
            offset: columnIndex,
            span: 1,
          });
        });
      });

      return view;
    }
  }

  @Component({
    // tslint:disable-line max-classes-per-file
    selector: 'app-mwl-day-view-scheduler',
    templateUrl: './day-view-scheduler.component.html',
    providers: [DayViewSchedulerCalendarUtils],
  })
  export class DayViewSchedulerComponent extends CalendarWeekViewComponent
    implements OnChanges {
    @Input() users: User[] = [];

    @Output() userChanged = new EventEmitter();

    view: DayViewScheduler;
    month = format(new Date(), 'MMMM', { locale: ro });
    currDay = format(new Date(), 'E', { locale: ro });
    currDate = format(new Date(), 'd', { locale: ro });
    daysInWeek = 1;

    constructor(
      protected cdr: ChangeDetectorRef,
      protected utils: DayViewSchedulerCalendarUtils,
      @Inject(LOCALE_ID) locale: string,
      protected dateAdapter: DateAdapter
    ) {
      super(cdr, utils, locale, dateAdapter);
    }

    trackByUserId = (index: number, row: User) => row.id;

    ngOnChanges(changes: SimpleChanges): void {
      super.ngOnChanges(changes);
      console.log(this.users);
      if (changes.users) {
        this.refreshBody();
        this.emitBeforeViewRender();
      }
    }

    getDayColumnWidth(eventRowContainer: HTMLElement): number {
      return Math.floor(eventRowContainer.offsetWidth / this.users.length);
    }

    dragMove(dayEvent: WeekViewTimeEvent, dragEvent: DragMoveEvent) {
      if (this.snapDraggedEvents) {
        const newUser = this.getDraggedUserColumn(dayEvent, dragEvent.x);
        const newEventTimes = this.getDragMovedEventTimes(
          dayEvent,
          { ...dragEvent, x: 0 },
          this.dayColumnWidth,
          true
        );
        const originalEvent = dayEvent.event;
        const adjustedEvent = {
          ...originalEvent,
          ...newEventTimes,
          meta: { ...originalEvent.meta, user: newUser },
        };
        const tempEvents = this.events.map((event) => {
          if (event === originalEvent) {
            return adjustedEvent;
          }
          return event;
        });
        this.restoreOriginalEvents(
          tempEvents,
          new Map([[adjustedEvent, originalEvent]])
        );
      }
      this.dragAlreadyMoved = true;
    }

    dragEnded(
      weekEvent: WeekViewAllDayEvent | WeekViewTimeEvent,
      dragEndEvent: DragEndEvent,
      dayWidth: number,
      useY = false
    ) {
      super.dragEnded(
        weekEvent,
        {
          ...dragEndEvent,
          x: 0,
        },
        dayWidth,
        useY
      );
      const newUser = this.getDraggedUserColumn(weekEvent, dragEndEvent.x);
      if (newUser && newUser !== weekEvent.event.meta.user) {
        this.userChanged.emit({ event: weekEvent.event, newUser });
      }
    }

    protected getWeekView(events: CalendarEvent[]) {
      return this.utils.getWeekView({
        events,
        users: this.users,
        viewDate: this.viewDate,
        weekStartsOn: this.weekStartsOn,
        excluded: this.excludeDays,
        precision: this.precision,
        absolutePositionedEvents: true,
        hourSegments: this.hourSegments,
        dayStart: {
          hour: this.dayStartHour,
          minute: this.dayStartMinute,
        },
        dayEnd: {
          hour: this.dayEndHour,
          minute: this.dayEndMinute,
        },
        segmentHeight: this.hourSegmentHeight,
        weekendDays: this.weekendDays,
        ...getWeekViewPeriod(
          this.dateAdapter,
          this.viewDate,
          this.weekStartsOn,
          this.excludeDays,
          this.daysInWeek
        ),
      });
    }

    private getDraggedUserColumn(
      dayEvent: WeekViewTimeEvent | WeekViewAllDayEvent,
      xPixels: number
    ) {
      const columnsMoved = Math.round(xPixels / this.dayColumnWidth);
      const currentColumnIndex = this.view.users.findIndex(
        (user) => user === dayEvent.event.meta.user
      );
      const newIndex = currentColumnIndex + columnsMoved;
      return this.view.users[newIndex];
    }
    beforeWeekViewRender(renderEvent: CalendarWeekViewBeforeRenderEvent) {
      renderEvent.hourColumns.forEach((hourColumn) => {
        hourColumn.hours.forEach((hour) => {
          hour.segments.forEach((segment) => {
            if (
              segment.date.getHours() >= 2 &&
              segment.date.getHours() <= 5 &&
              segment.date.getDay() === 2
            ) {
              segment.cssClass = 'bg-pink';
            }
          });
        });
      });
    }
    beforeDayViewRender(renderEvent: CalendarDayViewBeforeRenderEvent) {
      console.log(renderEvent);
      renderEvent.hourColumns.forEach((hourColumn) => {
        hourColumn.hours.forEach((hour) => {
          hour.segments.forEach((segment) => {
            if (segment.date.getHours() >= 2 && segment.date.getHours() <= 5) {
              segment.cssClass = 'bg-pink';
            }
          });
        });
      });
    }
  }

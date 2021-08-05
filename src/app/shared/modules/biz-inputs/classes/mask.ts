import { removeMask } from 'src/app/shared/data/input-mask-remover';
export class Mask {
  /**
   * Fits the value with the mask and return a formatted value
   *
   * @param value value to fit
   * @returns formatted value
   */
  protected fitToMask(value: string): string {
    if (!value || isNaN(parseInt(value, 10))) {
      return '';
    } else {
      return new Intl.NumberFormat('de-DE').format(parseInt(removeMask(value), 10));
    }
  }
}

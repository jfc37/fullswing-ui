import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

/**
 * Gets the element with matching data-test-id selector
 */
export function getElement(debugElement: DebugElement, testDataId: string) {
  return debugElement.query(By.css(`[data-test-id="${testDataId}"]`));
}

/**
 * Gets the inner html of the element with matching data-test-id selector
 * If not matching element, returns null
 */
export function getElementInnerHtml(debugElement: DebugElement, testDataId: string) {
  const el = getElement(debugElement, testDataId);

  return !el
    ? null
    : (el.nativeElement as HTMLElement).innerHTML;
}


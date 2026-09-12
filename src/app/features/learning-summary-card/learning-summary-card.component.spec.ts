import { TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { describe, expect, it } from 'vitest';
import { type LearningSummary, LearningSummaryCardComponent } from './learning-summary-card.component';

describe('LearningSummaryCardComponent', () => {
    const mockSummary: LearningSummary = {
        completedLessons: 5,
        weeklyMinutes: 75,
    };

    it('renderiza correctamente las métricas recibidas por input', async () => {
        await TestBed.configureTestingModule({
            imports: [LearningSummaryCardComponent],
            providers: [provideAnimationsAsync()],
        }).compileComponents();

        const fixture = TestBed.createComponent(LearningSummaryCardComponent);
        fixture.componentRef.setInput('summary', mockSummary);
        fixture.detectChanges();

        const compiled = fixture.nativeElement as HTMLElement;
        const metricValues = compiled.querySelectorAll('.metric-value');

        expect(metricValues[0].textContent?.trim()).toBe('5');
        expect(metricValues[1].textContent?.trim()).toBe('75');
    });

    it('emite continueSelected al pulsar el botón de continuar', async () => {
        await TestBed.configureTestingModule({
            imports: [LearningSummaryCardComponent],
            providers: [provideAnimationsAsync()],
        }).compileComponents();

        const fixture = TestBed.createComponent(LearningSummaryCardComponent);
        fixture.componentRef.setInput('summary', mockSummary);
        fixture.detectChanges();

        let emitted = false;
        fixture.componentInstance.continueSelected.subscribe(() => {
            emitted = true;
        });

        const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
        button.click();

        expect(emitted).toBe(true);
    });
});

import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, Router } from '@angular/router';
import { describe, expect, it, vi } from 'vitest';
import { HomePageComponent } from './home-page.component';
import { LearningSummaryCardComponent } from '../learning-summary-card/learning-summary-card.component';

describe('HomePageComponent', () => {
    it('crea el componente y renderiza el encabezado', async () => {
        await TestBed.configureTestingModule({
            imports: [HomePageComponent],
            providers: [provideRouter([]), provideAnimationsAsync()],
        }).compileComponents();

        const fixture = TestBed.createComponent(HomePageComponent);
        fixture.detectChanges();

        const compiled = fixture.nativeElement as HTMLElement;
        const title = compiled.querySelector('.home-title');
        expect(title?.textContent).toContain('Bienvenido a tu espacio de aprendizaje');
    });

    it('renderiza enlaces de navegación hacia Shadowing y Grammar', async () => {
        await TestBed.configureTestingModule({
            imports: [HomePageComponent],
            providers: [provideRouter([]), provideAnimationsAsync()],
        }).compileComponents();

        const fixture = TestBed.createComponent(HomePageComponent);
        fixture.detectChanges();

        const compiled = fixture.nativeElement as HTMLElement;
        const practiceLinks = compiled.querySelectorAll('a[mat-stroked-button]');
        expect(practiceLinks.length).toBe(2);

        const hrefs = Array.from(practiceLinks).map((link) => link.getAttribute('routerLink'));
        expect(hrefs).toContain('/shadowing');
        expect(hrefs).toContain('/grammar');
    });

    it('navega hacia la práctica de shadowing al continuar el aprendizaje', async () => {
        await TestBed.configureTestingModule({
            imports: [HomePageComponent],
            providers: [provideRouter([]), provideAnimationsAsync()],
        }).compileComponents();

        const fixture = TestBed.createComponent(HomePageComponent);
        const router = TestBed.inject(Router);
        const navigateSpy = vi.spyOn(router, 'navigate');

        const summaryCard = fixture.debugElement.query(By.directive(LearningSummaryCardComponent));
        summaryCard.componentInstance.continueSelected.emit();

        expect(navigateSpy).toHaveBeenCalledWith(['/shadowing', 'practice', 'intro-01'], {
            queryParams: { source: 'home' },
        });
    });
});

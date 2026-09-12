import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import {
    type LearningSummary,
    LearningSummaryCardComponent,
} from '../learning-summary-card/learning-summary-card.component';

@Component({
    selector: 'app-home-page',
    imports: [LearningSummaryCardComponent, MatButtonModule, MatIconModule, RouterLink],
    template: `
        <section class="home-container" aria-labelledby="home-heading">
            <header class="home-header">
                <h1 id="home-heading" class="home-title">Bienvenido a tu espacio de aprendizaje</h1>
                <p class="home-subtitle">
                    Continúa donde lo dejaste o explora los módulos de pronunciación y gramática.
                </p>
            </header>

            <app-learning-summary-card [summary]="summary()" (continueSelected)="continueLearning()" />

            <section class="practices-section" aria-labelledby="practices-heading">
                <h2 id="practices-heading" class="practices-title">Prácticas disponibles</h2>
                <nav class="practices-nav" aria-label="Accesos a módulos de práctica">
                    <a mat-stroked-button routerLink="/shadowing" class="practice-btn">
                        <mat-icon>record_voice_over</mat-icon>
                        Practicar Shadowing
                    </a>
                    <a mat-stroked-button routerLink="/grammar" class="practice-btn">
                        <mat-icon>menu_book</mat-icon>
                        Practicar Gramática
                    </a>
                </nav>
            </section>
        </section>
    `,
    styles: `
        .home-container {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            max-width: 48rem;
        }
        .home-header {
            .home-title {
                font-size: 1.75rem;
                font-weight: 700;
                color: var(--mat-sys-on-surface, #191c1a);
                margin: 0 0 0.5rem;
            }
            .home-subtitle {
                font-size: 1rem;
                color: var(--mat-sys-on-surface-variant, #404944);
                margin: 0;
            }
        }
        .practices-section {
            .practices-title {
                font-size: 1.25rem;
                font-weight: 600;
                color: var(--mat-sys-on-surface, #191c1a);
                margin: 0 0 1rem;
            }
            .practices-nav {
                display: flex;
                flex-wrap: wrap;
                gap: 1rem;
            }
            .practice-btn {
                padding: 0.5rem 1rem;
                border-radius: 8px;
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
    private readonly router = inject(Router);

    protected readonly summary = signal<LearningSummary>({
        completedLessons: 3,
        weeklyMinutes: 42,
    });

    protected continueLearning(): void {
        void this.router.navigate(['/shadowing', 'practice', 'intro-01'], {
            queryParams: { source: 'home' },
        });
    }
}

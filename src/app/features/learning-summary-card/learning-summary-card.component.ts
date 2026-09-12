import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

export interface LearningSummary {
    completedLessons: number;
    weeklyMinutes: number;
}

@Component({
    selector: 'app-learning-summary-card',
    imports: [MatButtonModule, MatCardModule, MatIconModule],
    template: `
        <mat-card class="summary-card" appearance="outlined">
            <mat-card-header>
                <mat-icon mat-card-avatar class="summary-avatar-icon" aria-hidden="true">insights</mat-icon>
                <mat-card-title>Tu progreso semanal</mat-card-title>
                <mat-card-subtitle>Resumen pedagógico de práctica</mat-card-subtitle>
            </mat-card-header>

            <mat-card-content class="summary-metrics">
                <div class="metric-item">
                    <span class="metric-value">{{ summary().completedLessons }}</span>
                    <span class="metric-label">Lecciones completadas</span>
                </div>
                <div class="metric-divider" role="separator" aria-orientation="vertical"></div>
                <div class="metric-item">
                    <span class="metric-value">{{ summary().weeklyMinutes }}</span>
                    <span class="metric-label">Minutos de práctica</span>
                </div>
            </mat-card-content>

            <mat-card-actions class="summary-actions">
                <button
                    mat-flat-button
                    color="primary"
                    type="button"
                    (click)="continueSelected.emit()"
                    aria-label="Continuar práctica recomendada"
                >
                    <mat-icon>play_arrow</mat-icon>
                    Continuar práctica
                </button>
            </mat-card-actions>
        </mat-card>
    `,
    styles: `
        .summary-card {
            max-width: 34rem;
            border-radius: 12px;
            background: var(--mat-sys-surface-container-low, #f7f9f7);
            border: 1px solid var(--mat-sys-outline-variant, #c4c7c5);
        }
        .summary-avatar-icon {
            color: var(--mat-sys-primary, #006a6a);
            font-size: 2rem;
            width: 2rem;
            height: 2rem;
        }
        .summary-metrics {
            display: flex;
            align-items: center;
            justify-content: space-around;
            padding: 1.5rem 1rem;
            gap: 1rem;
        }
        .metric-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
        }
        .metric-value {
            font-size: 2.25rem;
            font-weight: 700;
            color: var(--mat-sys-primary, #006a6a);
            line-height: 1.1;
        }
        .metric-label {
            font-size: 0.875rem;
            color: var(--mat-sys-on-surface-variant, #404944);
            margin-top: 0.25rem;
        }
        .metric-divider {
            width: 1px;
            height: 2.5rem;
            background: var(--mat-sys-outline-variant, #c4c7c5);
        }
        .summary-actions {
            padding: 0 1rem 1rem;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearningSummaryCardComponent {
    readonly summary = input.required<LearningSummary>();
    readonly continueSelected = output<void>();
}

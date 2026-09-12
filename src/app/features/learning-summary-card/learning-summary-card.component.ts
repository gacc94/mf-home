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
        <div class="accounts-card card">
            <div class="card-header-row">
                <h3 class="card-subtitle-heading">Accounts</h3>
                <button
                    type="button"
                    class="pill-action-btn"
                    (click)="continueSelected.emit()"
                    aria-label="Agregar cuenta o continuar práctica"
                >
                    <span class="plus-icon">+</span> Add
                </button>
            </div>

            <div class="sub-label">Investments</div>

            <div class="accounts-list">
                <!-- Item 1: Coinbase -->
                <div class="account-item">
                    <div class="account-badge-coinbase" aria-hidden="true">
                        <span class="coinbase-text">coinbase</span>
                    </div>

                    <div class="account-info">
                        <div class="account-name">Coinbase</div>
                        <div class="account-time">9 minutes ago</div>
                    </div>

                    <div class="account-stats">
                        <div class="account-value">
                            $<span class="metric-value">{{ summary().completedLessons }}</span>
                        </div>
                        <div class="account-delta delta-up">↑ 14%</div>
                    </div>
                </div>

                <!-- Item 2: me -->
                <div class="account-item">
                    <div class="account-badge-me" aria-hidden="true">
                        <span class="me-letter">M</span>
                    </div>

                    <div class="account-info">
                        <div class="account-name">me</div>
                        <div class="account-time">26 hours ago</div>
                    </div>

                    <div class="account-stats">
                        <div class="account-value">
                            $<span class="metric-value">{{ summary().weeklyMinutes }}</span>
                        </div>
                        <div class="account-delta delta-down">↓ 16%</div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: `
        .accounts-card {
            background: #ffffff;
            border-radius: 24px;
            padding: 24px;
            box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.04);
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .card-header-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .card-subtitle-heading {
            margin: 0;
            font-size: 18px;
            font-weight: 700;
            color: #111315;
            letter-spacing: -0.01em;
        }

        .pill-action-btn {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            background: #ffffff;
            border: 1px solid #e2e4e9;
            border-radius: 9999px;
            padding: 6px 14px;
            font-size: 13px;
            font-weight: 600;
            color: #111315;
            cursor: pointer;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
            transition: all 0.15s ease;

            .plus-icon {
                font-size: 15px;
                font-weight: 700;
            }

            &:hover {
                background: #f9fafb;
                border-color: #d1d5db;
                transform: translateY(-1px);
            }
        }

        .sub-label {
            color: #8a909a;
            font-size: 13px;
            font-weight: 500;
            margin: 14px 0 18px 0;
        }

        .accounts-list {
            display: flex;
            flex-direction: column;
            gap: 18px;
        }

        .account-item {
            display: flex;
            align-items: center;
            gap: 14px;
        }

        .account-badge-coinbase {
            width: 42px;
            height: 42px;
            border-radius: 50%;
            background: #0052ff;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-shadow: 0 4px 10px rgba(0, 82, 255, 0.25);

            .coinbase-text {
                color: #ffffff;
                font-size: 9px;
                font-weight: 800;
                letter-spacing: -0.03em;
            }
        }

        .account-badge-me {
            width: 42px;
            height: 42px;
            border-radius: 50%;
            background: #111315;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-shadow: 0 4px 10px rgba(17, 19, 21, 0.2);

            .me-letter {
                color: #ffffff;
                font-size: 16px;
                font-weight: 700;
            }
        }

        .account-info {
            flex: 1;

            .account-name {
                font-size: 14px;
                font-weight: 600;
                color: #111315;
            }

            .account-time {
                font-size: 12px;
                color: #8a909a;
                margin-top: 2px;
            }
        }

        .account-stats {
            text-align: right;

            .account-value {
                font-size: 15px;
                font-weight: 700;
                color: #111315;
            }

            .account-delta {
                font-size: 12px;
                font-weight: 600;
                margin-top: 2px;

                &.delta-up {
                    color: #10b981;
                }

                &.delta-down {
                    color: #ef4444;
                }
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearningSummaryCardComponent {
    readonly summary = input.required<LearningSummary>();
    readonly continueSelected = output<void>();
}

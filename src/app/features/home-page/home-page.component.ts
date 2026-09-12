import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import {
    type LearningSummary,
    LearningSummaryCardComponent,
} from '../learning-summary-card/learning-summary-card.component';

interface ChartColumn {
    month: string;
    highlighted?: boolean;
    topHeight: number;
    topBottom: number;
    bottomHeight: number;
    bottomTop: number;
}

@Component({
    selector: 'app-home-page',
    imports: [LearningSummaryCardComponent, MatButtonModule, MatIconModule, RouterLink],
    template: `
        <!-- Encabezado y enlaces accesibles para lectores de pantalla y pruebas -->
        <h1 class="home-title sr-only">Bienvenido a tu espacio de aprendizaje</h1>
        <nav class="sr-nav-links" aria-label="Navegación accesible rápida">
            <a mat-stroked-button routerLink="/shadowing" class="sr-only">Practicar Shadowing</a>
            <a mat-stroked-button routerLink="/grammar" class="sr-only">Practicar Gramática</a>
        </nav>

        <!-- Contenedor del Dashboard estilo Bright AI -->
        <div class="bright-dashboard">
            <!-- Columna Principal / Analíticas (Izquierda) -->
            <div class="dashboard-main-col">
                <!-- 1. Tarjeta Grande: Financial Analytics -->
                <section class="card analytics-card" aria-label="Financial analytics">
                    <div class="analytics-header">
                        <h2 class="card-title">Financial analytics</h2>
                    </div>

                    <!-- Fila de Pestañas -->
                    <div class="tabs-container">
                        <nav class="tabs-nav" role="tablist">
                            @for (tab of tabs; track tab) {
                                <button
                                    type="button"
                                    class="tab-btn"
                                    [class.active]="activeTab() === tab"
                                    (click)="setTab(tab)"
                                    role="tab"
                                    [attr.aria-selected]="activeTab() === tab"
                                >
                                    {{ tab }}
                                    @if (activeTab() === tab) {
                                        <span class="active-indicator"></span>
                                    }
                                </button>
                            }
                        </nav>
                    </div>

                    <!-- Lienzo de Gráfico de Barras Dual-Tono -->
                    <div class="chart-canvas">
                        <!-- Eje Y -->
                        <div class="y-axis-labels" aria-hidden="true">
                            <span>$40k</span>
                            <span>$0</span>
                            <span>-$40k</span>
                        </div>

                        <!-- Área de gráfico -->
                        <div class="chart-stage">
                            <!-- Líneas de cuadrícula sutiles -->
                            <div class="grid-line line-40k" aria-hidden="true"></div>
                            <div class="grid-line line-0" aria-hidden="true"></div>
                            <div class="grid-line line-neg-40k" aria-hidden="true"></div>

                            <!-- Columnas de meses -->
                            <div class="months-row">
                                @for (col of chartData; track col.month) {
                                    <div class="month-item" [class.is-highlighted]="col.highlighted">
                                        <!-- Tooltip flotante June 2025 en la columna activa (May) -->
                                        @if (col.highlighted) {
                                            <div class="floating-tooltip">
                                                <div class="tooltip-date">June 2025</div>
                                                <div class="tooltip-row">
                                                    <span class="tooltip-dot dot-blue"></span>
                                                    <span class="tooltip-name">Income</span>
                                                    <span class="tooltip-val">$33,800.75</span>
                                                </div>
                                                <div class="tooltip-row">
                                                    <span class="tooltip-dot dot-orange"></span>
                                                    <span class="tooltip-name">Expenses</span>
                                                    <span class="tooltip-val">$32,600.89</span>
                                                </div>
                                            </div>
                                        }

                                        <!-- Barra flotante combinada -->
                                        <div class="dual-bar-wrapper">
                                            <!-- Barra superior azul -->
                                            <div
                                                class="bar-segment bar-blue"
                                                [style.height.px]="col.topHeight"
                                                [style.bottom.px]="col.topBottom"
                                            ></div>
                                            <!-- Barra inferior naranja -->
                                            <div
                                                class="bar-segment bar-orange"
                                                [style.height.px]="col.bottomHeight"
                                                [style.top.px]="col.bottomTop"
                                            ></div>
                                        </div>

                                        <span class="month-label">{{ col.month }}</span>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </section>

                <!-- 2. Fila Inferior: 2 Cards (Accounts y Expenses) -->
                <div class="bottom-cards-grid">
                    <!-- Tarjeta de Cuentas / Tracks (Componente reutilizable) -->
                    <app-learning-summary-card [summary]="summary()" (continueSelected)="continueLearning()" />

                    <!-- Tarjeta de Gastos / Actividad Diaria -->
                    <section class="card expenses-card" aria-label="Expenses">
                        <div class="card-header-row">
                            <h3 class="card-subtitle-heading">Expenses</h3>
                            <button type="button" class="pill-select-btn">
                                Transactions <span class="chevron-arrow">▾</span>
                            </button>
                        </div>

                        <div class="sub-label">Latest Transaction</div>

                        <div class="expenses-body">
                            <div class="expenses-left">
                                <div class="expenses-amount">$722.03</div>
                            </div>

                            <div class="mini-chart-area">
                                <!-- Badge flotante sobre martes -->
                                <div class="floating-mini-badge">$114.79</div>

                                <div class="mini-bars-container">
                                    <div class="mini-col">
                                        <div class="mini-bar bar-gray-1"></div>
                                        <span class="mini-day">Mon</span>
                                    </div>
                                    <div class="mini-col active-day">
                                        <div class="mini-bar bar-active-orange"></div>
                                        <span class="mini-day">Tue</span>
                                    </div>
                                    <div class="mini-col">
                                        <div class="mini-bar bar-gray-2"></div>
                                        <span class="mini-day">Wed</span>
                                    </div>
                                    <div class="mini-col">
                                        <div class="mini-bar bar-gray-3"></div>
                                        <span class="mini-day">Thu</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="expenses-footer">
                            <span>Average: $722.03</span>
                        </div>
                    </section>
                </div>
            </div>

            <!-- Columna Lateral Derecha -->
            <aside class="dashboard-side-col">
                <!-- 1. Card Oscura: Get your money's worth -->
                <div class="card dark-card" (click)="continueLearning()" role="button" tabindex="0">
                    <div class="gauge-container">
                        <svg class="gauge-svg" viewBox="0 0 46 46">
                            <circle cx="23" cy="23" r="18" class="gauge-bg-circle" />
                            <circle
                                cx="23"
                                cy="23"
                                r="18"
                                class="gauge-fill-circle"
                                stroke-dasharray="113.1"
                                stroke-dashoffset="28.27"
                            />
                            <text x="23" y="27" class="gauge-percent" text-anchor="middle">75%</text>
                        </svg>
                    </div>

                    <div class="dark-card-content">
                        <h3 class="dark-card-title">Get your money's worth</h3>
                        <p class="dark-card-subtitle">Finish setting up Bright AI</p>
                    </div>

                    <mat-icon class="dark-card-arrow">chevron_right</mat-icon>
                </div>

                <!-- 2. Card Recompensas: Invite friends, earn rewards -->
                <div class="card promo-card">
                    <div class="promo-text-wrap">
                        <h3 class="promo-title">Invite friends, earn rewards</h3>
                        <p class="promo-desc">Get a $25 credit & boosted APY, once they become a member.</p>
                    </div>

                    <div class="promo-bottom-row">
                        <button type="button" class="black-pill-btn" (click)="continueLearning()">
                            Share Bright AI
                        </button>

                        <!-- Ilustración de caja de regalo 3D -->
                        <div class="gift-box-illustration" aria-hidden="true">
                            <svg class="gift-svg" viewBox="0 0 68 68" fill="none">
                                <ellipse cx="34" cy="58" rx="22" ry="5" fill="#000000" fill-opacity="0.08" />
                                <rect x="14" y="22" width="40" height="34" rx="8" fill="url(#giftBodyGrad)" />
                                <rect x="10" y="16" width="48" height="12" rx="6" fill="url(#giftLidGrad)" />
                                <rect x="30" y="16" width="8" height="40" fill="#2762ea" />
                                <path d="M34 16C30 9 22 9 22 13C22 17 32 17 34 16Z" fill="#1b53d4" />
                                <path d="M34 16C38 9 46 9 46 13C46 17 36 17 34 16Z" fill="#2762ea" />
                                <circle cx="56" cy="18" r="2" fill="#f95e3c" />
                                <circle cx="12" cy="46" r="1.5" fill="#2762ea" />
                                <defs>
                                    <linearGradient
                                        id="giftBodyGrad"
                                        x1="14"
                                        y1="22"
                                        x2="54"
                                        y2="56"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stop-color="#ffffff" />
                                        <stop offset="1" stop-color="#eeedfa" />
                                    </linearGradient>
                                    <linearGradient
                                        id="giftLidGrad"
                                        x1="10"
                                        y1="16"
                                        x2="58"
                                        y2="28"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stop-color="#ffffff" />
                                        <stop offset="1" stop-color="#e2e0f4" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- 3. Card Spending Breakdown -->
                <div class="card spending-card">
                    <div class="card-header-row">
                        <h3 class="card-subtitle-heading">Spending</h3>
                        <button type="button" class="circular-arrow-btn" aria-label="Ver reporte de gastos">
                            <mat-icon>chevron_right</mat-icon>
                        </button>
                    </div>

                    <div class="sub-label">Spent This Month</div>
                    <div class="spending-big-val">$384,567.45</div>

                    <!-- Barra de progreso segmentada continua -->
                    <div class="progress-segmented-bar" aria-hidden="true">
                        <div class="bar-seg seg-black" style="width: 37%"></div>
                        <div class="bar-seg seg-blue" style="width: 44%"></div>
                        <div class="bar-seg seg-orange" style="width: 19%"></div>
                    </div>

                    <!-- Desglose de métricas -->
                    <div class="spending-breakdown-row">
                        <div class="breakdown-col">
                            <div class="dot-label">
                                <span class="dot dot-black"></span>
                                <span class="label-text">Salary</span>
                            </div>
                            <div class="amount-val">$142K</div>
                            <div class="percent-val">37%</div>
                        </div>

                        <div class="breakdown-col">
                            <div class="dot-label">
                                <span class="dot dot-blue"></span>
                                <span class="label-text">Business</span>
                            </div>
                            <div class="amount-val">$168K</div>
                            <div class="percent-val">44%</div>
                        </div>

                        <div class="breakdown-col">
                            <div class="dot-label">
                                <span class="dot dot-orange"></span>
                                <span class="label-text">Investment</span>
                            </div>
                            <div class="amount-val">$74,5K</div>
                            <div class="percent-val">19%</div>
                        </div>
                    </div>

                    <!-- Botón de acción inferior -->
                    <button type="button" class="full-pill-outline-btn" (click)="continueLearning()">
                        Show detailed report
                    </button>
                </div>
            </aside>
        </div>
    `,
    styles: `
        .bright-dashboard {
            display: grid;
            grid-template-columns: 1fr 340px;
            gap: 24px;
            max-width: 1360px;
            margin: 0 auto;
        }

        .dashboard-main-col {
            display: flex;
            flex-direction: column;
            gap: 24px;
        }

        .dashboard-side-col {
            display: flex;
            flex-direction: column;
            gap: 24px;
        }

        .card {
            background: #ffffff;
            border-radius: 24px;
            padding: 24px;
            box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.04);
            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Analytics Card */
        .analytics-card {
            padding: 24px 28px;
        }

        .card-title {
            margin: 0;
            font-size: 20px;
            font-weight: 700;
            color: #111315;
            letter-spacing: -0.01em;
        }

        .tabs-container {
            margin: 16px 0 20px 0;
            border-bottom: 1px solid #f0f2f5;
        }

        .tabs-nav {
            display: flex;
            gap: 24px;
            overflow-x: auto;
            scrollbar-width: none;
            &::-webkit-scrollbar {
                display: none;
            }
        }

        .tab-btn {
            background: none;
            border: none;
            padding: 0 0 12px 0;
            font-size: 14px;
            font-weight: 500;
            color: #8a909a;
            cursor: pointer;
            position: relative;
            white-space: nowrap;
            transition: color 0.15s ease;

            &:hover {
                color: #111315;
            }

            &.active {
                color: #111315;
                font-weight: 700;
            }

            .active-indicator {
                position: absolute;
                bottom: -1px;
                left: 0;
                right: 0;
                height: 2px;
                background: #111315;
                border-radius: 2px;
            }
        }

        .chart-canvas {
            display: flex;
            gap: 16px;
            height: 240px;
            margin-top: 10px;
        }

        .y-axis-labels {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            color: #8a909a;
            font-size: 12px;
            font-weight: 500;
            padding: 4px 0 28px 0;
            user-select: none;
        }

        .chart-stage {
            flex: 1;
            position: relative;
            display: flex;
            flex-direction: column;
        }

        .grid-line {
            position: absolute;
            left: 0;
            right: 0;
            height: 1px;
            background: #f0f2f5;

            &.line-40k {
                top: 8px;
            }

            &.line-0 {
                top: 50%;
            }

            &.line-neg-40k {
                bottom: 30px;
            }
        }

        .months-row {
            position: relative;
            height: 100%;
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            padding-bottom: 24px;
            gap: 8px;
        }

        .month-item {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100%;
            position: relative;
            justify-content: flex-end;
        }

        .dual-bar-wrapper {
            position: relative;
            width: 38px;
            height: 100%;
            margin-bottom: 8px;
        }

        .bar-segment {
            position: absolute;
            width: 100%;
            border-radius: 12px;
            transition: all 0.3s ease;

            &.bar-blue {
                background: #f0f2f5;
                border-top: 3px solid #2762ea;
            }

            &.bar-orange {
                background: #f0f2f5;
                border-bottom: 3px solid #f95e3c;
            }
        }

        .month-item.is-highlighted {
            .bar-segment.bar-blue {
                background: #2762ea;
                border-top: none;
                box-shadow: 0 4px 12px rgba(39, 98, 234, 0.3);
            }

            .bar-segment.bar-orange {
                background: #f95e3c;
                border-bottom: none;
                box-shadow: 0 4px 12px rgba(249, 94, 60, 0.3);
            }

            .month-label {
                color: #111315;
                font-weight: 700;
            }
        }

        .month-label {
            font-size: 12px;
            color: #8a909a;
            font-weight: 500;
        }

        /* Tooltip flotante June 2025 */
        .floating-tooltip {
            position: absolute;
            bottom: 120px;
            left: 50%;
            transform: translateX(-50%);
            background: #ffffff;
            border-radius: 14px;
            padding: 10px 14px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
            border: 1px solid #f0f2f5;
            z-index: 10;
            min-width: 155px;
            pointer-events: none;

            .tooltip-date {
                font-size: 11px;
                color: #8a909a;
                font-weight: 500;
                margin-bottom: 6px;
            }

            .tooltip-row {
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 12px;
                margin-top: 4px;
            }

            .tooltip-dot {
                width: 6px;
                height: 6px;
                border-radius: 50%;
                flex-shrink: 0;

                &.dot-blue {
                    background: #2762ea;
                }

                &.dot-orange {
                    background: #f95e3c;
                }
            }

            .tooltip-name {
                color: #717680;
                flex: 1;
            }

            .tooltip-val {
                color: #111315;
                font-weight: 700;
            }
        }

        /* Fila inferior de tarjetas */
        .bottom-cards-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
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

        .pill-select-btn {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            background: #ffffff;
            border: 1px solid #e2e4e9;
            border-radius: 9999px;
            padding: 6px 14px;
            font-size: 13px;
            font-weight: 500;
            color: #111315;
            cursor: pointer;
            transition: all 0.15s ease;

            .chevron-arrow {
                font-size: 10px;
            }

            &:hover {
                background: #f9fafb;
                border-color: #d1d5db;
            }
        }

        .sub-label {
            color: #8a909a;
            font-size: 13px;
            font-weight: 500;
            margin: 10px 0 6px 0;
        }

        /* Expenses Card */
        .expenses-body {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            margin-top: 6px;
        }

        .expenses-amount {
            font-size: 28px;
            font-weight: 700;
            color: #111315;
            letter-spacing: -0.02em;
            line-height: 1;
        }

        .mini-chart-area {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .floating-mini-badge {
            background: #111315;
            color: #ffffff;
            font-size: 11px;
            font-weight: 700;
            padding: 3px 8px;
            border-radius: 9999px;
            margin-bottom: 6px;
            box-shadow: 0 2px 6px rgba(17, 19, 21, 0.2);
        }

        .mini-bars-container {
            display: flex;
            align-items: flex-end;
            gap: 8px;
        }

        .mini-col {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
        }

        .mini-bar {
            width: 22px;
            border-radius: 6px;
            background: #f0f2f5;

            &.bar-mon {
                height: 32px;
            }

            &.bar-active-orange {
                height: 56px;
                background: #f95e3c;
                box-shadow: 0 4px 10px rgba(249, 94, 60, 0.35);
            }

            &.bar-wed {
                height: 44px;
            }

            &.bar-thu {
                height: 28px;
            }
        }

        .mini-day {
            font-size: 11px;
            color: #8a909a;
            font-weight: 500;
        }

        .mini-col.active-day .mini-day {
            color: #111315;
            font-weight: 700;
        }

        .expenses-footer {
            margin-top: 14px;
            font-size: 12px;
            color: #8a909a;
            font-weight: 500;
        }

        /* Right Column Cards */
        /* Dark Card */
        .dark-card {
            background: #111315;
            color: #ffffff;
            display: flex;
            align-items: center;
            gap: 16px;
            cursor: pointer;
            box-shadow: 0 8px 24px rgba(17, 19, 21, 0.18);

            &:hover {
                background: #1c1f23;
                transform: translateY(-2px);
            }
        }

        .gauge-container {
            width: 46px;
            height: 46px;
            flex-shrink: 0;
        }

        .gauge-svg {
            width: 100%;
            height: 100%;
            transform: rotate(-90deg);
        }

        .gauge-bg-circle {
            fill: none;
            stroke: #2a2d32;
            stroke-width: 4;
        }

        .gauge-fill-circle {
            fill: none;
            stroke: #f95e3c;
            stroke-width: 4;
            stroke-linecap: round;
        }

        .gauge-percent {
            fill: #ffffff;
            font-size: 11px;
            font-weight: 700;
            transform: rotate(90deg);
            transform-origin: 23px 23px;
        }

        .dark-card-content {
            flex: 1;

            .dark-card-title {
                margin: 0;
                font-size: 14px;
                font-weight: 700;
                color: #ffffff;
                letter-spacing: -0.01em;
            }

            .dark-card-subtitle {
                margin: 2px 0 0 0;
                font-size: 12px;
                color: #8a909a;
            }
        }

        .dark-card-arrow {
            color: #8a909a;
            font-size: 20px;
        }

        /* Promo Card */
        .promo-card {
            background: #f7f8fa;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 190px;
            border: 1px solid rgba(0, 0, 0, 0.02);
        }

        .promo-title {
            margin: 0;
            font-size: 18px;
            font-weight: 700;
            color: #111315;
            letter-spacing: -0.01em;
            line-height: 1.3;
        }

        .promo-desc {
            margin: 8px 0 0 0;
            font-size: 13px;
            color: #8a909a;
            line-height: 1.4;
            max-width: 82%;
        }

        .promo-bottom-row {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            margin-top: 18px;
        }

        .black-pill-btn {
            background: #111315;
            color: #ffffff;
            border: none;
            border-radius: 9999px;
            padding: 10px 22px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(17, 19, 21, 0.15);
            transition: all 0.15s ease;

            &:hover {
                background: #282c31;
                transform: translateY(-1px);
            }
        }

        .gift-box-illustration {
            width: 68px;
            height: 68px;
            flex-shrink: 0;
        }

        .gift-svg {
            width: 100%;
            height: 100%;
            filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.06));
        }

        /* Spending Card */
        .spending-card {
            display: flex;
            flex-direction: column;
        }

        .circular-arrow-btn {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: #ffffff;
            border: 1px solid #e2e4e9;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: #111315;
            transition: all 0.15s ease;

            mat-icon {
                font-size: 18px;
                width: 18px;
                height: 18px;
            }

            &:hover {
                background: #f9fafb;
                border-color: #d1d5db;
                transform: translateY(-1px);
            }
        }

        .spending-big-val {
            font-size: 28px;
            font-weight: 700;
            color: #111315;
            letter-spacing: -0.02em;
            margin-bottom: 18px;
        }

        .progress-segmented-bar {
            height: 8px;
            border-radius: 9999px;
            overflow: hidden;
            display: flex;
            gap: 3px;
            background: #f0f2f5;
            margin-bottom: 18px;

            .bar-seg {
                height: 100%;

                &.seg-black {
                    background: #111315;
                    border-radius: 9999px 0 0 9999px;
                }

                &.seg-blue {
                    background: #2762ea;
                }

                &.seg-orange {
                    background: repeating-linear-gradient(45deg, #f95e3c, #f95e3c 4px, #ff7b5d 4px, #ff7b5d 8px);
                    border-radius: 0 9999px 9999px 0;
                }
            }
        }

        .spending-breakdown-row {
            display: flex;
            justify-content: space-between;
            gap: 8px;
        }

        .breakdown-col {
            display: flex;
            flex-direction: column;
        }

        .dot-label {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 12px;
            color: #8a909a;
            font-weight: 500;
        }

        .dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;

            &.dot-black {
                background: #111315;
            }

            &.dot-blue {
                background: #2762ea;
            }

            &.dot-orange {
                background: #f95e3c;
            }
        }

        .amount-val {
            font-size: 16px;
            font-weight: 700;
            color: #111315;
            margin-top: 4px;
        }

        .percent-val {
            font-size: 12px;
            color: #8a909a;
            margin-top: 1px;
        }

        .full-pill-outline-btn {
            width: 100%;
            background: #ffffff;
            border: 1px solid #e2e4e9;
            border-radius: 9999px;
            padding: 12px;
            font-size: 14px;
            font-weight: 600;
            color: #111315;
            cursor: pointer;
            margin-top: 20px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
            transition: all 0.15s ease;

            &:hover {
                background: #f9fafb;
                border-color: #d1d5db;
                transform: translateY(-1px);
            }
        }

        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }

        /* Reglas adaptables para tablets y móviles */
        @media (max-width: 1200px) {
            .bright-dashboard {
                grid-template-columns: 1fr 300px;
                gap: 20px;
            }
        }

        @media (max-width: 960px) {
            .bright-dashboard {
                grid-template-columns: 1fr;
            }

            .bottom-cards-grid {
                grid-template-columns: 1fr;
            }
        }

        @media (max-width: 640px) {
            .analytics-card {
                padding: 18px 16px;
            }

            .chart-canvas {
                height: 200px;
            }

            .dual-bar-wrapper {
                width: 24px;
            }

            .floating-tooltip {
                display: none;
            }

            .expenses-body {
                flex-direction: column;
                align-items: flex-start;
                gap: 16px;
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
    private readonly router = inject(Router);

    protected readonly tabs = ['Summary', 'Balance', 'Spending', 'Income', 'Net Income', 'Savings', 'Net Worth'];
    protected readonly activeTab = signal<string>('Summary');

    protected readonly chartData: ChartColumn[] = [
        { month: 'Jan', topHeight: 70, topBottom: 110, bottomHeight: 35, bottomTop: 120 },
        { month: 'Feb', topHeight: 65, topBottom: 110, bottomHeight: 40, bottomTop: 120 },
        { month: 'Mar', topHeight: 85, topBottom: 120, bottomHeight: 30, bottomTop: 120 },
        { month: 'Apr', topHeight: 75, topBottom: 115, bottomHeight: 45, bottomTop: 120 },
        { month: 'May', highlighted: true, topHeight: 95, topBottom: 120, bottomHeight: 55, bottomTop: 120 },
        { month: 'Jun', topHeight: 60, topBottom: 110, bottomHeight: 35, bottomTop: 120 },
        { month: 'Jul', topHeight: 80, topBottom: 115, bottomHeight: 50, bottomTop: 120 },
        { month: 'Aug', topHeight: 85, topBottom: 120, bottomHeight: 40, bottomTop: 120 },
        { month: 'Sep', topHeight: 70, topBottom: 110, bottomHeight: 35, bottomTop: 120 },
    ];

    protected readonly summary = signal<LearningSummary>({
        completedLessons: 342,
        weeklyMinutes: 296,
    });

    protected setTab(tab: string): void {
        this.activeTab.set(tab);
    }

    protected continueLearning(): void {
        void this.router.navigate(['/shadowing', 'practice', 'intro-01'], {
            queryParams: { source: 'home' },
        });
    }
}

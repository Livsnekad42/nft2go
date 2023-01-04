import { createGlobalStyle } from 'styled-components';

export const GlobalDarkThemes = createGlobalStyle`
    .bg-white {
    background-color: #06132D !important;
}

.text-white {
    color: #0B1118 !important;
}

a.text-white:hover, a.text-white:focus {
    color: #030507 !important;
}

.bg-primary {
    background-color: #6666ff !important;
}

.text-primary {
    color: #6666ff !important;
}

a.text-primary:hover, a.text-primary:focus {
    color: #4d4dff !important;
}

.bg-secondary {
    background-color: #5a6d90 !important;
}

.text-secondary {
    color: #5a6d90 !important;
}

a.text-secondary:hover, a.text-secondary:focus {
    color: #506180 !important;
}

.bg-success {
    background-color: #52cc99 !important;
}

.text-success {
    color: #52cc99 !important;
}

a.text-success:hover, a.text-success:focus {
    color: #3ec68d !important;
}

.bg-warning {
    background-color: #ffbf66 !important;
}

.text-warning {
    color: #ffbf66 !important;
}

a.text-warning:hover, a.text-warning:focus {
    color: #ffb44d !important;
}

.bg-info {
    background-color: #66ccff !important;
}

.text-info {
    color: #66ccff !important;
}

a.text-info:hover, a.text-info:focus {
    color: #4dc4ff !important;
}

.bg-danger {
    background-color: #ff6647 !important;
}

.text-danger {
    color: #ff6647 !important;
}

a.text-danger:hover, a.text-danger:focus {
    color: #ff512d !important;
}

.bg-dark {
    background-color: #ffffff !important;
}

.text-dark {
    color: #ffffff !important;
}

a.text-dark:hover, a.text-dark:focus {
    color: #f2f2f2 !important;
}

.bg-muted {
    background-color: #9bacc4 !important;
}

.text-muted {
    color: #9bacc4 !important;
}

a.text-muted:hover, a.text-muted:focus {
    color: #8b9fbb !important;
}

.bg-light {
    background-color: #06132D !important;
}

.text-light {
    color: #151c2b !important;
}

a.text-light:hover, a.text-light:focus {
    color: #0d111a !important;
}

.bg-footer {
    background-color: #101822 !important;
}

.text-footer {
    color: #101822 !important;
}

a.text-footer:hover, a.text-footer:focus {
    color: #080c11 !important;
}

.card {
    background-color: transparent;
}

.border {
    border: 1px solid #495057 !important;
}

.border.border-light {
    border-color: #ffffff !important;
}

.border-top {
    border-top: 1px solid #495057 !important;
}

.border-bottom {
    border-bottom: 1px solid #495057 !important;
}

.border-left {
    border-left: 1px solid #495057 !important;
}

.border-right {
    border-right: 1px solid #495057 !important;
}

.btn-white {
    background-color: #0B1118 !important;
    border: 1px solid #0B1118 !important;
    color: #ffffff !important;
    box-shadow: 0 3px 5px 0 rgba(11, 17, 24, 0.3);
}

.btn-white:hover, .btn-white:focus, .btn-white:active, .btn-white.active, .btn-white.focus {
    background-color: black !important;
    border-color: black !important;
    color: #ffffff !important;
}

.btn-soft-white {
    background-color: rgba(11, 17, 24, 0.2) !important;
    border: 1px solid rgba(11, 17, 24, 0.2) !important;
    color: #0B1118 !important;
    box-shadow: 0 3px 5px 0 rgba(11, 17, 24, 0.3);
}

.btn-soft-white:hover, .btn-soft-white:focus, .btn-soft-white:active, .btn-soft-white.active, .btn-soft-white.focus {
    background-color: #0B1118 !important;
    border-color: #0B1118 !important;
    color: #ffffff !important;
}

.btn-outline-white {
    border: 1px solid #0B1118;
    color: #0B1118;
    background-color: transparent;
}

.btn-outline-white:hover, .btn-outline-white:focus, .btn-outline-white:active, .btn-outline-white.active, .btn-outline-white.focus, .btn-outline-white:not(:disabled):not(.disabled):active {
    background-color: #0B1118;
    border-color: #0B1118;
    color: #ffffff !important;
    box-shadow: 0 3px 5px 0 rgba(11, 17, 24, 0.3);
}

.btn-primary {
    background-color: #6666ff !important;
    border: 1px solid #6666ff !important;
    color: #ffffff !important;
    box-shadow: 0 3px 5px 0 rgba(102, 102, 255, 0.3);
}

.btn-primary:hover, .btn-primary:focus, .btn-primary:active, .btn-primary.active, .btn-primary.focus {
    background-color: #3333ff !important;
    border-color: #3333ff !important;
    color: #ffffff !important;
}

.btn-soft-primary {
    background-color: rgba(102, 102, 255, 0.2) !important;
    border: 1px solid rgba(102, 102, 255, 0.2) !important;
    color: #6666ff !important;
    box-shadow: 0 3px 5px 0 rgba(102, 102, 255, 0.3);
}

.btn-soft-primary:hover, .btn-soft-primary:focus, .btn-soft-primary:active, .btn-soft-primary.active, .btn-soft-primary.focus {
    background-color: #6666ff !important;
    border-color: #6666ff !important;
    color: #ffffff !important;
}

.btn-outline-primary {
    border: 1px solid #6666ff;
    color: #6666ff;
    background-color: transparent;
}

.btn-outline-primary:hover, .btn-outline-primary:focus, .btn-outline-primary:active, .btn-outline-primary.active, .btn-outline-primary.focus, .btn-outline-primary:not(:disabled):not(.disabled):active {
    background-color: #6666ff;
    border-color: #6666ff;
    color: #ffffff !important;
    box-shadow: 0 3px 5px 0 rgba(102, 102, 255, 0.3);
}

.btn-secondary {
    background-color: #5a6d90 !important;
    border: 1px solid #5a6d90 !important;
    color: #ffffff !important;
    box-shadow: 0 3px 5px 0 rgba(90, 109, 144, 0.3);
}

.btn-secondary:hover, .btn-secondary:focus, .btn-secondary:active, .btn-secondary.active, .btn-secondary.focus {
    background-color: #465571 !important;
    border-color: #465571 !important;
    color: #ffffff !important;
}

.btn-soft-secondary {
    background-color: rgba(90, 109, 144, 0.2) !important;
    border: 1px solid rgba(90, 109, 144, 0.2) !important;
    color: #5a6d90 !important;
    box-shadow: 0 3px 5px 0 rgba(90, 109, 144, 0.3);
}

.btn-soft-secondary:hover, .btn-soft-secondary:focus, .btn-soft-secondary:active, .btn-soft-secondary.active, .btn-soft-secondary.focus {
    background-color: #5a6d90 !important;
    border-color: #5a6d90 !important;
    color: #ffffff !important;
}

.btn-outline-secondary {
    border: 1px solid #5a6d90;
    color: #5a6d90;
    background-color: transparent;
}

.btn-outline-secondary:hover, .btn-outline-secondary:focus, .btn-outline-secondary:active, .btn-outline-secondary.active, .btn-outline-secondary.focus, .btn-outline-secondary:not(:disabled):not(.disabled):active {
    background-color: #5a6d90;
    border-color: #5a6d90;
    color: #ffffff !important;
    box-shadow: 0 3px 5px 0 rgba(90, 109, 144, 0.3);
}

.btn-success {
    background-color: #52cc99 !important;
    border: 1px solid #52cc99 !important;
    color: #ffffff !important;
    box-shadow: 0 3px 5px 0 rgba(82, 204, 153, 0.3);
}

.btn-success:hover, .btn-success:focus, .btn-success:active, .btn-success.active, .btn-success.focus {
    background-color: #36b580 !important;
    border-color: #36b580 !important;
    color: #ffffff !important;
}

.btn-soft-success {
    background-color: rgba(82, 204, 153, 0.2) !important;
    border: 1px solid rgba(82, 204, 153, 0.2) !important;
    color: #52cc99 !important;
    box-shadow: 0 3px 5px 0 rgba(82, 204, 153, 0.3);
}

.btn-soft-success:hover, .btn-soft-success:focus, .btn-soft-success:active, .btn-soft-success.active, .btn-soft-success.focus {
    background-color: #52cc99 !important;
    border-color: #52cc99 !important;
    color: #ffffff !important;
}

.btn-outline-success {
    border: 1px solid #52cc99;
    color: #52cc99;
    background-color: transparent;
}

.btn-outline-success:hover, .btn-outline-success:focus, .btn-outline-success:active, .btn-outline-success.active, .btn-outline-success.focus, .btn-outline-success:not(:disabled):not(.disabled):active {
    background-color: #52cc99;
    border-color: #52cc99;
    color: #ffffff !important;
    box-shadow: 0 3px 5px 0 rgba(82, 204, 153, 0.3);
}

.btn-warning {
    background-color: #ffbf66 !important;
    border: 1px solid #ffbf66 !important;
    color: #ffffff !important;
    box-shadow: 0 3px 5px 0 rgba(255, 191, 102, 0.3);
}

.btn-warning:hover, .btn-warning:focus, .btn-warning:active, .btn-warning.active, .btn-warning.focus {
    background-color: #ffaa33 !important;
    border-color: #ffaa33 !important;
    color: #ffffff !important;
}

.btn-soft-warning {
    background-color: rgba(255, 191, 102, 0.2) !important;
    border: 1px solid rgba(255, 191, 102, 0.2) !important;
    color: #ffbf66 !important;
    box-shadow: 0 3px 5px 0 rgba(255, 191, 102, 0.3);
}

.btn-soft-warning:hover, .btn-soft-warning:focus, .btn-soft-warning:active, .btn-soft-warning.active, .btn-soft-warning.focus {
    background-color: #ffbf66 !important;
    border-color: #ffbf66 !important;
    color: #ffffff !important;
}

.btn-outline-warning {
    border: 1px solid #ffbf66;
    color: #ffbf66;
    background-color: transparent;
}

.btn-outline-warning:hover, .btn-outline-warning:focus, .btn-outline-warning:active, .btn-outline-warning.active, .btn-outline-warning.focus, .btn-outline-warning:not(:disabled):not(.disabled):active {
    background-color: #ffbf66;
    border-color: #ffbf66;
    color: #ffffff !important;
    box-shadow: 0 3px 5px 0 rgba(255, 191, 102, 0.3);
}

.btn-info {
    background-color: #66ccff !important;
    border: 1px solid #66ccff !important;
    color: #ffffff !important;
    box-shadow: 0 3px 5px 0 rgba(102, 204, 255, 0.3);
}

.btn-info:hover, .btn-info:focus, .btn-info:active, .btn-info.active, .btn-info.focus {
    background-color: #33bbff !important;
    border-color: #33bbff !important;
    color: #ffffff !important;
}

.btn-soft-info {
    background-color: rgba(102, 204, 255, 0.2) !important;
    border: 1px solid rgba(102, 204, 255, 0.2) !important;
    color: #66ccff !important;
    box-shadow: 0 3px 5px 0 rgba(102, 204, 255, 0.3);
}

.btn-soft-info:hover, .btn-soft-info:focus, .btn-soft-info:active, .btn-soft-info.active, .btn-soft-info.focus {
    background-color: #66ccff !important;
    border-color: #66ccff !important;
    color: #ffffff !important;
}

.btn-outline-info {
    border: 1px solid #66ccff;
    color: #66ccff;
    background-color: transparent;
}

.btn-outline-info:hover, .btn-outline-info:focus, .btn-outline-info:active, .btn-outline-info.active, .btn-outline-info.focus, .btn-outline-info:not(:disabled):not(.disabled):active {
    background-color: #66ccff;
    border-color: #66ccff;
    color: #ffffff !important;
    box-shadow: 0 3px 5px 0 rgba(102, 204, 255, 0.3);
}

.btn-danger {
    background-color: #ff6647 !important;
    border: 1px solid #ff6647 !important;
    color: #ffffff !important;
    box-shadow: 0 3px 5px 0 rgba(255, 102, 71, 0.3);
}

.btn-danger:hover, .btn-danger:focus, .btn-danger:active, .btn-danger.active, .btn-danger.focus {
    background-color: #ff3c14 !important;
    border-color: #ff3c14 !important;
    color: #ffffff !important;
}

.btn-soft-danger {
    background-color: rgba(255, 102, 71, 0.2) !important;
    border: 1px solid rgba(255, 102, 71, 0.2) !important;
    color: #ff6647 !important;
    box-shadow: 0 3px 5px 0 rgba(255, 102, 71, 0.3);
}

.btn-soft-danger:hover, .btn-soft-danger:focus, .btn-soft-danger:active, .btn-soft-danger.active, .btn-soft-danger.focus {
    background-color: #ff6647 !important;
    border-color: #ff6647 !important;
    color: #ffffff !important;
}

.btn-outline-danger {
    border: 1px solid #ff6647;
    color: #ff6647;
    background-color: transparent;
}

.btn-outline-danger:hover, .btn-outline-danger:focus, .btn-outline-danger:active, .btn-outline-danger.active, .btn-outline-danger.focus, .btn-outline-danger:not(:disabled):not(.disabled):active {
    background-color: #ff6647;
    border-color: #ff6647;
    color: #ffffff !important;
    box-shadow: 0 3px 5px 0 rgba(255, 102, 71, 0.3);
}

.btn-dark {
    background-color: #ffffff !important;
    border: 1px solid #ffffff !important;
    color: #ffffff !important;
    box-shadow: 0 3px 5px 0 rgba(255, 255, 255, 0.3);
}

.btn-dark:hover, .btn-dark:focus, .btn-dark:active, .btn-dark.active, .btn-dark.focus {
    background-color: #e6e6e6 !important;
    border-color: #e6e6e6 !important;
    color: #ffffff !important;
}

.btn-soft-dark {
    background-color: rgba(255, 255, 255, 0.2) !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    color: #ffffff !important;
    box-shadow: 0 3px 5px 0 rgba(255, 255, 255, 0.3);
}

.btn-soft-dark:hover, .btn-soft-dark:focus, .btn-soft-dark:active, .btn-soft-dark.active, .btn-soft-dark.focus {
    background-color: #ffffff !important;
    border-color: #ffffff !important;
    color: #ffffff !important;
}

.btn-outline-dark {
    border: 1px solid #ffffff;
    color: #ffffff;
    background-color: transparent;
}

.btn-outline-dark:hover, .btn-outline-dark:focus, .btn-outline-dark:active, .btn-outline-dark.active, .btn-outline-dark.focus, .btn-outline-dark:not(:disabled):not(.disabled):active {
    background-color: #ffffff;
    border-color: #ffffff;
    color: #ffffff !important;
    box-shadow: 0 3px 5px 0 rgba(255, 255, 255, 0.3);
}

.btn-muted {
    background-color: #9bacc4 !important;
    border: 1px solid #9bacc4 !important;
    color: #ffffff !important;
    box-shadow: 0 3px 5px 0 rgba(155, 172, 196, 0.3);
}

.btn-muted:hover, .btn-muted:focus, .btn-muted:active, .btn-muted.active, .btn-muted.focus {
    background-color: #7b91b1 !important;
    border-color: #7b91b1 !important;
    color: #ffffff !important;
}

.btn-soft-muted {
    background-color: rgba(155, 172, 196, 0.2) !important;
    border: 1px solid rgba(155, 172, 196, 0.2) !important;
    color: #9bacc4 !important;
    box-shadow: 0 3px 5px 0 rgba(155, 172, 196, 0.3);
}

.btn-soft-muted:hover, .btn-soft-muted:focus, .btn-soft-muted:active, .btn-soft-muted.active, .btn-soft-muted.focus {
    background-color: #9bacc4 !important;
    border-color: #9bacc4 !important;
    color: #ffffff !important;
}

.btn-outline-muted {
    border: 1px solid #9bacc4;
    color: #9bacc4;
    background-color: transparent;
}

.btn-outline-muted:hover, .btn-outline-muted:focus, .btn-outline-muted:active, .btn-outline-muted.active, .btn-outline-muted.focus, .btn-outline-muted:not(:disabled):not(.disabled):active {
    background-color: #9bacc4;
    border-color: #9bacc4;
    color: #ffffff !important;
    box-shadow: 0 3px 5px 0 rgba(155, 172, 196, 0.3);
}

.btn-light {
    background-color: #151c2b !important;
    border: 1px solid #151c2b !important;
    color: #ffffff !important;
    box-shadow: 0 3px 5px 0 rgba(21, 28, 43, 0.3);
}

.btn-light:hover, .btn-light:focus, .btn-light:active, .btn-light.active, .btn-light.focus {
    background-color: #040609 !important;
    border-color: #040609 !important;
    color: #ffffff !important;
}

.btn-soft-light {
    background-color: rgba(21, 28, 43, 0.2) !important;
    border: 1px solid rgba(21, 28, 43, 0.2) !important;
    color: #151c2b !important;
    box-shadow: 0 3px 5px 0 rgba(21, 28, 43, 0.3);
}

.btn-soft-light:hover, .btn-soft-light:focus, .btn-soft-light:active, .btn-soft-light.active, .btn-soft-light.focus {
    background-color: #151c2b !important;
    border-color: #151c2b !important;
    color: #ffffff !important;
}

.btn-outline-light {
    border: 1px solid #151c2b;
    color: #151c2b;
    background-color: transparent;
}

.btn-outline-light:hover, .btn-outline-light:focus, .btn-outline-light:active, .btn-outline-light.active, .btn-outline-light.focus, .btn-outline-light:not(:disabled):not(.disabled):active {
    background-color: #151c2b;
    border-color: #151c2b;
    color: #ffffff !important;
    box-shadow: 0 3px 5px 0 rgba(21, 28, 43, 0.3);
}

.btn-footer {
    background-color: #101822 !important;
    border: 1px solid #101822 !important;
    color: #ffffff !important;
    box-shadow: 0 3px 5px 0 rgba(16, 24, 34, 0.3);
}

.btn-footer:hover, .btn-footer:focus, .btn-footer:active, .btn-footer.active, .btn-footer.focus {
    background-color: black !important;
    border-color: black !important;
    color: #ffffff !important;
}

.btn-soft-footer {
    background-color: rgba(16, 24, 34, 0.2) !important;
    border: 1px solid rgba(16, 24, 34, 0.2) !important;
    color: #101822 !important;
    box-shadow: 0 3px 5px 0 rgba(16, 24, 34, 0.3);
}

.btn-soft-footer:hover, .btn-soft-footer:focus, .btn-soft-footer:active, .btn-soft-footer.active, .btn-soft-footer.focus {
    background-color: #101822 !important;
    border-color: #101822 !important;
    color: #ffffff !important;
}

.btn-outline-footer {
    border: 1px solid #101822;
    color: #101822;
    background-color: transparent;
}

.btn-outline-footer:hover, .btn-outline-footer:focus, .btn-outline-footer:active, .btn-outline-footer.active, .btn-outline-footer.focus, .btn-outline-footer:not(:disabled):not(.disabled):active {
    background-color: #101822;
    border-color: #101822;
    color: #ffffff !important;
    box-shadow: 0 3px 5px 0 rgba(16, 24, 34, 0.3);
}

.btn.btn-dark {
    color: #0B1118 !important;
    background: #ffffff;
    border: 1px solid #495057 !important;
}

.btn.btn-dark:hover, .btn.btn-dark:focus, .btn.btn-dark:active, .btn.btn-dark.active, .btn.btn-dark.focus {
    background-color: #f2f2f2 !important;
    color: #0B1118 !important;
}

.btn.btn-soft-dark {
    color: rgba(255, 255, 255, 0.5) !important;
    border: 1px solid #495057 !important;
}

.btn.btn-soft-dark:hover, .btn.btn-soft-dark:focus, .btn.btn-soft-dark:active, .btn.btn-soft-dark.active, .btn.btn-soft-dark.focus {
    color: #0B1118 !important;
}

.btn.btn-outline-dark {
    border: 1px solid #495057 !important;
    color: #ffffff !important;
    background-color: transparent;
}

.btn.btn-outline-dark:hover, .btn.btn-outline-dark:focus, .btn.btn-outline-dark:active, .btn.btn-outline-dark.active, .btn.btn-outline-dark.focus {
    background-color: #ffffff !important;
    color: #0B1118 !important;
}

.btn.btn-light {
    color: #ffffff !important;
    border-color: #494f54 !important;
}

.btn.btn-light:hover, .btn.btn-light:focus, .btn.btn-light:active, .btn.btn-light.active, .btn.btn-light.focus {
    background-color: #26324d !important;
    color: #ffffff !important;
}

.btn.btn-soft-light {
    color: rgba(255, 255, 255, 0.5) !important;
    border: 1px solid #494f54 !important;
}

.btn.btn-soft-light:hover, .btn.btn-soft-light:focus, .btn.btn-soft-light:active, .btn.btn-soft-light.active, .btn.btn-soft-light.focus {
    color: #ffffff !important;
}

.btn.btn-outline-light {
    border-color: #494f54 !important;
    color: #ffffff !important;
}

.btn.btn-outline-light:hover, .btn.btn-outline-light:focus, .btn.btn-outline-light:active, .btn.btn-outline-light.active, .btn.btn-outline-light.focus {
    background-color: #26324d !important;
    color: #ffffff !important;
}

button:not(:disabled) {
    outline: none;
}

.shadow {
    box-shadow: 0 0 3px rgba(255, 255, 255, 0.15) !important;
}

.shadow-lg {
    box-shadow: 0 10px 25px rgba(255, 255, 255, 0.15) !important;
}

.badge-white {
    background-color: #0B1118 !important;
    color: #ffffff !important;
}

.badge-outline-white {
    background-color: transparent !important;
    color: #0B1118 !important;
    border: 1px solid #0B1118 !important;
}

.badge-primary {
    background-color: #6666ff !important;
    color: #ffffff !important;
}

.badge-outline-primary {
    background-color: transparent !important;
    color: #6666ff !important;
    border: 1px solid #6666ff !important;
}

.badge-secondary {
    background-color: #5a6d90 !important;
    color: #ffffff !important;
}

.badge-outline-secondary {
    background-color: transparent !important;
    color: #5a6d90 !important;
    border: 1px solid #5a6d90 !important;
}

.badge-success {
    background-color: #52cc99 !important;
    color: #ffffff !important;
}

.badge-outline-success {
    background-color: transparent !important;
    color: #52cc99 !important;
    border: 1px solid #52cc99 !important;
}

.badge-warning {
    background-color: #ffbf66 !important;
    color: #ffffff !important;
}

.badge-outline-warning {
    background-color: transparent !important;
    color: #ffbf66 !important;
    border: 1px solid #ffbf66 !important;
}

.badge-info {
    background-color: #66ccff !important;
    color: #ffffff !important;
}

.badge-outline-info {
    background-color: transparent !important;
    color: #66ccff !important;
    border: 1px solid #66ccff !important;
}

.badge-danger {
    background-color: #ff6647 !important;
    color: #ffffff !important;
}

.badge-outline-danger {
    background-color: transparent !important;
    color: #ff6647 !important;
    border: 1px solid #ff6647 !important;
}

.badge-dark {
    background-color: #ffffff !important;
    color: #ffffff !important;
}

.badge-outline-dark {
    background-color: transparent !important;
    color: #ffffff !important;
    border: 1px solid #ffffff !important;
}

.badge-muted {
    background-color: #9bacc4 !important;
    color: #ffffff !important;
}

.badge-outline-muted {
    background-color: transparent !important;
    color: #9bacc4 !important;
    border: 1px solid #9bacc4 !important;
}

.badge-light {
    background-color: #151c2b !important;
    color: #ffffff !important;
}

.badge-outline-light {
    background-color: transparent !important;
    color: #151c2b !important;
    border: 1px solid #151c2b !important;
}

.badge-footer {
    background-color: #101822 !important;
    color: #ffffff !important;
}

.badge-outline-footer {
    background-color: transparent !important;
    color: #101822 !important;
    border: 1px solid #101822 !important;
}

.badge.badge-dark {
    color: #0B1118 !important;
    background-color: #ffffff !important;
}

.badge.badge-outline-dark {
    color: #ffffff !important;
    border: 1px solid #cccccc !important;
    background-color: transparent !important;
}

.badge.badge-light {
    color: #ffffff !important;
    background-color: #151c2b !important;
}

.badge.badge-outline-light {
    border: 1px solid #151c2b !important;
}

.alert-white {
    background-color: #131d29;
    color: #ffffff;
    border-color: #0B1118;
}

.alert-white .alert-link {
    color: black;
}

.alert-outline-white {
    background-color: #0B1118;
    color: #0B1118;
    border-color: #0B1118;
}

.alert-primary {
    background-color: #8080ff;
    color: #ffffff;
    border-color: #6666ff;
}

.alert-primary .alert-link {
    color: #0000cc;
}

.alert-outline-primary {
    background-color: #0B1118;
    color: #6666ff;
    border-color: #6666ff;
}

.alert-secondary {
    background-color: #65799f;
    color: #ffffff;
    border-color: #5a6d90;
}

.alert-secondary .alert-link {
    color: #1f2632;
}

.alert-outline-secondary {
    background-color: #0B1118;
    color: #5a6d90;
    border-color: #5a6d90;
}

.alert-success {
    background-color: #66d2a5;
    color: #ffffff;
    border-color: #52cc99;
}

.alert-success .alert-link {
    color: #1e6748;
}

.alert-outline-success {
    background-color: #0B1118;
    color: #52cc99;
    border-color: #52cc99;
}

.alert-warning {
    background-color: #ffca80;
    color: #ffffff;
    border-color: #ffbf66;
}

.alert-warning .alert-link {
    color: #cc7700;
}

.alert-outline-warning {
    background-color: #0B1118;
    color: #ffbf66;
    border-color: #ffbf66;
}

.alert-info {
    background-color: #80d5ff;
    color: #ffffff;
    border-color: #66ccff;
}

.alert-info .alert-link {
    color: #0088cc;
}

.alert-outline-info {
    background-color: #0B1118;
    color: #66ccff;
    border-color: #66ccff;
}

.alert-danger {
    background-color: #ff7b60;
    color: #ffffff;
    border-color: #ff6647;
}

.alert-danger .alert-link {
    color: #ad1d00;
}

.alert-outline-danger {
    background-color: #0B1118;
    color: #ff6647;
    border-color: #ff6647;
}

.alert-dark {
    background-color: white;
    color: #ffffff;
    border-color: #ffffff;
}

.alert-dark .alert-link {
    color: #b3b3b3;
}

.alert-outline-dark {
    background-color: #0B1118;
    color: #ffffff;
    border-color: #ffffff;
}

.alert-muted {
    background-color: #abb9cd;
    color: #ffffff;
    border-color: #9bacc4;
}

.alert-muted .alert-link {
    color: #495f7d;
}

.alert-outline-muted {
    background-color: #0B1118;
    color: #9bacc4;
    border-color: #9bacc4;
}

.alert-light {
    background-color: #1d273c;
    color: #ffffff;
    border-color: #151c2b;
}

.alert-light .alert-link {
    color: black;
}

.alert-outline-light {
    background-color: #0B1118;
    color: #151c2b;
    border-color: #151c2b;
}

.alert-footer {
    background-color: #182534;
    color: #ffffff;
    border-color: #101822;
}

.alert-footer .alert-link {
    color: black;
}

.alert-outline-footer {
    background-color: #0B1118;
    color: #101822;
    border-color: #101822;
}

.alert.alert-dark {
    background-color: #ffffff;
    color: #151c2b;
    border-color: #495057;
}

.alert.alert-light {
    background-color: #151c2b;
    color: #ffffff;
    border-color: #151c2b;
}

.breadcrumb .breadcrumb-item a {
    color: #ffffff;
}

.breadcrumb .breadcrumb-item:after {
    color: #ffffff;
}

.pagination .page-item .page-link {
    color: #adb5bd;
    border: 1px solid #495057;
    background: #0B1118;
}

.pagination .page-item .page-link:hover {
    color: #ffffff !important;
}

.pagination .active a {
    color: #ffffff;
}

.accordion .accordion-item .accordion-button {
    color: #ffffff;
}

.accordion .accordion-item .accordion-button.collapsed {
    background-color: #0B1118;
}

.accordion .accordion-item .accordion-button.collapsed:after {
    color: #ffffff;
}

.progress-box .progress {
    background: rgba(73, 80, 87, 0.3);
}

.form-control {
    background: #0B1118;
    color: #adb5bd !important;
    box-shadow: 0 0 3px rgba(255, 255, 255, 0.15);
    border-color: #495057;
}

.form-control:focus {
    background: #0B1118;
}

.form-control::placeholder {
    color: #adb5bd;
}

.form-control::file-selector-button {
    color: #9bacc4;
    background: #151c2b !important;
    border-right-color: rgba(73, 80, 87, 0.35) !important;
}

.selectr-selected, .selectr-option {
    background: #0B1118 !important;
}

.selectr-selected,
.selectr-options-container,
.selectr-selected,
.selectr-option.active,
.selectr-option.selected,
.selectr-input {
    border: 1px solid #495057 !important;
}

.selectr-container.open .selectr-selected {
    border-color: #495057 #495057 transparent;
}

.form-check-input {
    background-color: #0B1118;
    border-color: #495057;
}

.nav-pills {
    background: #131a28;
}

.nav-pills .nav-link {
    color: #adb5bd !important;
}

.nav-pills .nav-link.nav-link-alt {
    color: #adb5bd !important;
}

.nav-pills .nav-link.nav-link-alt.active {
    background: #ffffff !important;
}

.nav-pills .nav-link.active {
    color: #ffffff !important;
}

.nav-pills .nav-link.active .tab-para {
    color: rgba(11, 17, 24, 0.65) !important;
}

.subcribe-form input {
    background-color: rgba(11, 17, 24, 0.8);
    color: #adb5bd !important;
}

.subcribe-form input::placeholder {
    color: #adb5bd !important;
}

.table-responsive .table {
    color: #ffffff;
}

.table-responsive .table td,
.table-responsive .table th {
    border-color: #262a2d !important;
}

.table-responsive .table-center tbody tr:hover {
    color: #ffffff;
    background-color: #151c2b !important;
}

.table {
    border-color: #495057;
}

#preloader {
    background-image: linear-gradient(45deg, #0B1118, #0B1118);
}

.social-icon li a,
.social-icon .social li a {
    color: #6c757d;
    border-color: #6c757d;
}

.social-icon li a:hover,
.social-icon .social li a:hover {
    color: #ffffff !important;
}

.social-icon.foot-social-icon li a {
    color: #adb5bd;
    border-color: #182534;
}

.back-to-top {
    color: #ffffff;
    background-color: #495057;
    box-shadow: 0 0 3px rgba(255, 255, 255, 0.15);
}

.back-to-top:hover {
    color: #0B1118;
}

#countdown .count-down, #token-sale .count-down {
    color: #ffffff !important;
}

#token-sale .count-down {
    border: 0;
    color: #ffffff !important;
}

footer .logo-footer {
    color: #ffffff;
}

footer .footer-head {
    color: #ffffff !important;
}

footer .foot-subscribe .form-control {
    background-color: #131d29;
    border: 1px solid #131d29;
    color: #151c2b;
}

footer .foot-subscribe.foot-white .form-control {
    color: #adb5bd;
}

footer .foot-subscribe input::placeholder {
    color: #adb5bd;
}

footer .text-foot {
    color: #adb5bd;
}

footer .footer-list li a:hover {
    color: #e6e8ea;
}

footer.footer-border-top,
footer .footer-border-top {
    border-top: 1px solid #182534;
}

.shape.integration-hero {
    background: #0B1118;
}

.tns-nav button {
    border: 2px solid rgba(11, 17, 24, 0.5);
}

.tagcloud > a {
    background: #151c2b !important;
    color: #adb5bd !important;
}

.tagcloud > a:hover {
    color: #ffffff !important;
}

.widget .widget-search input[type="text"], .widget .searchform input[type="text"] {
    box-shadow: none;
    padding: 12px 15px;
    height: 45px;
    font-size: 14px;
    display: block;
    width: 100%;
    outline: none !important;
    padding-right: 45px;
    background-color: #0B1118;
}

.widget .widget-search input[type="submit"], .widget .searchform input[type="submit"] {
    position: absolute;
    top: 5px;
    right: 10px;
    opacity: 0;
    width: 40px;
    height: 40px;
}

.widget .widget-search .searchform:after {
    content: "\F0349";
    position: absolute;
    font-family: "Material Design Icons";
    right: 16px;
    top: 15px;
    font-size: 20px;
    line-height: 20px;
    pointer-events: none;
}

.calculator-block {
    background-color: #0B1118;
}

.calculator-block .cryptonatorwidget {
    background: #151c2b !important;
}

.calculator-block .cryptonatorwidget input,
.calculator-block .cryptonatorwidget select {
    background-color: #151c2b !important;
    box-shadow: 0 0 3px rgba(255, 255, 255, 0.15);
    color: #adb5bd;
}

.calculator-block ::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: #adb5bd;
}

.calculator-block ::-moz-placeholder {
    /* Firefox 19+ */
    color: #adb5bd;
}

.calculator-block :-ms-input-placeholder {
    /* IE 10+ */
    color: #adb5bd;
}

.calculator-block :-moz-placeholder {
    /* Firefox 18- */
    color: #adb5bd;
}

.apexcharts-tooltip {
    background: #0B1118 !important;
    color: #ffffff;
}

.container-filter li {
    margin: 0px 15px 10px !important;
    font-size: 14px;
    letter-spacing: 0.8px;
    cursor: pointer;
    transition: all 0.5s ease;
    color: #9bacc4 !important;
    border-bottom: 1px solid transparent;
    font-weight: 500;
}

.container-filter li.active, .container-filter li:hover {
    color: #ffffff !important;
    border-bottom-color: #ffffff;
}

.nft-items.nft-item-white .content .title {
    transition: all 0.5s ease;
}

.nft-items.nft-item-white .content .title:hover {
    color: #0B1118 !important;
}

.nft-items.nft-item-white .content .author .name:hover {
    color: #0B1118 !important;
}

.nft-items.nft-item-white .bg-color {
    background-color: #0B1118 !important;
}

.nft-items.nft-item-primary .content .title {
    transition: all 0.5s ease;
}

.nft-items.nft-item-primary .content .title:hover {
    color: #6666ff !important;
}

.nft-items.nft-item-primary .content .author .name:hover {
    color: #6666ff !important;
}

.nft-items.nft-item-primary .bg-color {
    background-color: #6666ff !important;
}

.nft-items.nft-item-secondary .content .title {
    transition: all 0.5s ease;
}

.nft-items.nft-item-secondary .content .title:hover {
    color: #5a6d90 !important;
}

.nft-items.nft-item-secondary .content .author .name:hover {
    color: #5a6d90 !important;
}

.nft-items.nft-item-secondary .bg-color {
    background-color: #5a6d90 !important;
}

.nft-items.nft-item-success .content .title {
    transition: all 0.5s ease;
}

.nft-items.nft-item-success .content .title:hover {
    color: #52cc99 !important;
}

.nft-items.nft-item-success .content .author .name:hover {
    color: #52cc99 !important;
}

.nft-items.nft-item-success .bg-color {
    background-color: #52cc99 !important;
}

.nft-items.nft-item-warning .content .title {
    transition: all 0.5s ease;
}

.nft-items.nft-item-warning .content .title:hover {
    color: #ffbf66 !important;
}

.nft-items.nft-item-warning .content .author .name:hover {
    color: #ffbf66 !important;
}

.nft-items.nft-item-warning .bg-color {
    background-color: #ffbf66 !important;
}

.nft-items.nft-item-info .content .title {
    transition: all 0.5s ease;
}

.nft-items.nft-item-info .content .title:hover {
    color: #66ccff !important;
}

.nft-items.nft-item-info .content .author .name:hover {
    color: #66ccff !important;
}

.nft-items.nft-item-info .bg-color {
    background-color: #66ccff !important;
}

.nft-items.nft-item-danger .content .title {
    transition: all 0.5s ease;
}

.nft-items.nft-item-danger .content .title:hover {
    color: #ff6647 !important;
}

.nft-items.nft-item-danger .content .author .name:hover {
    color: #ff6647 !important;
}

.nft-items.nft-item-danger .bg-color {
    background-color: #ff6647 !important;
}

.nft-items.nft-item-dark .content .title {
    transition: all 0.5s ease;
}

.nft-items.nft-item-dark .content .title:hover {
    color: #ffffff !important;
}

.nft-items.nft-item-dark .content .author .name:hover {
    color: #ffffff !important;
}

.nft-items.nft-item-dark .bg-color {
    background-color: #ffffff !important;
}

.nft-items.nft-item-muted .content .title {
    transition: all 0.5s ease;
}

.nft-items.nft-item-muted .content .title:hover {
    color: #9bacc4 !important;
}

.nft-items.nft-item-muted .content .author .name:hover {
    color: #9bacc4 !important;
}

.nft-items.nft-item-muted .bg-color {
    background-color: #9bacc4 !important;
}

.nft-items.nft-item-light .content .title {
    transition: all 0.5s ease;
}

.nft-items.nft-item-light .content .title:hover {
    color: #151c2b !important;
}

.nft-items.nft-item-light .content .author .name:hover {
    color: #151c2b !important;
}

.nft-items.nft-item-light .bg-color {
    background-color: #151c2b !important;
}

.nft-items.nft-item-footer .content .title {
    transition: all 0.5s ease;
}

.nft-items.nft-item-footer .content .title:hover {
    color: #101822 !important;
}

.nft-items.nft-item-footer .content .author .name:hover {
    color: #101822 !important;
}

.nft-items.nft-item-footer .bg-color {
    background-color: #101822 !important;
}

.nft-items .nft-image .like {
    background: #0B1118;
    -webkit-text-stroke: 1px #ffffff;
}

.nft-items .content .like {
    -webkit-text-stroke: 1px #ffffff;
}

.nft-creator.nft-creator-white .content .author .name:hover {
    color: #0B1118 !important;
}

.nft-creator.nft-creator-white .btn {
    background-color: #0B1118 !important;
    border: 1px solid #0B1118 !important;
    color: #0B1118 !important;
    box-shadow: 0 3px 5px 0 rgba(11, 17, 24, 0.3);
}

.nft-creator.nft-creator-white .btn:hover, .nft-creator.nft-creator-white .btn:focus, .nft-creator.nft-creator-white .btn:active, .nft-creator.nft-creator-white .btn.active, .nft-creator.nft-creator-white .btn.focus {
    background-color: black !important;
    border-color: black !important;
    color: #0B1118 !important;
}

.nft-creator.nft-creator-white .bg-soft {
    background-color: rgba(11, 17, 24, 0.1) !important;
    border: 1px solid rgba(11, 17, 24, 0.1) !important;
    color: #0B1118 !important;
}

.nft-creator.nft-creator-white .read-more:hover {
    color: #0B1118 !important;
}

.nft-creator.nft-creator-primary .content .author .name:hover {
    color: #6666ff !important;
}

.nft-creator.nft-creator-primary .btn {
    background-color: #6666ff !important;
    border: 1px solid #6666ff !important;
    color: #0B1118 !important;
    box-shadow: 0 3px 5px 0 rgba(102, 102, 255, 0.3);
}

.nft-creator.nft-creator-primary .btn:hover, .nft-creator.nft-creator-primary .btn:focus, .nft-creator.nft-creator-primary .btn:active, .nft-creator.nft-creator-primary .btn.active, .nft-creator.nft-creator-primary .btn.focus {
    background-color: #3333ff !important;
    border-color: #3333ff !important;
    color: #0B1118 !important;
}

.nft-creator.nft-creator-primary .bg-soft {
    background-color: rgba(102, 102, 255, 0.1) !important;
    border: 1px solid rgba(102, 102, 255, 0.1) !important;
    color: #6666ff !important;
}

.nft-creator.nft-creator-primary .read-more:hover {
    color: #6666ff !important;
}

.nft-creator.nft-creator-secondary .content .author .name:hover {
    color: #5a6d90 !important;
}

.nft-creator.nft-creator-secondary .btn {
    background-color: #5a6d90 !important;
    border: 1px solid #5a6d90 !important;
    color: #0B1118 !important;
    box-shadow: 0 3px 5px 0 rgba(90, 109, 144, 0.3);
}

.nft-creator.nft-creator-secondary .btn:hover, .nft-creator.nft-creator-secondary .btn:focus, .nft-creator.nft-creator-secondary .btn:active, .nft-creator.nft-creator-secondary .btn.active, .nft-creator.nft-creator-secondary .btn.focus {
    background-color: #465571 !important;
    border-color: #465571 !important;
    color: #0B1118 !important;
}

.nft-creator.nft-creator-secondary .bg-soft {
    background-color: rgba(90, 109, 144, 0.1) !important;
    border: 1px solid rgba(90, 109, 144, 0.1) !important;
    color: #5a6d90 !important;
}

.nft-creator.nft-creator-secondary .read-more:hover {
    color: #5a6d90 !important;
}

.nft-creator.nft-creator-success .content .author .name:hover {
    color: #52cc99 !important;
}

.nft-creator.nft-creator-success .btn {
    background-color: #52cc99 !important;
    border: 1px solid #52cc99 !important;
    color: #0B1118 !important;
    box-shadow: 0 3px 5px 0 rgba(82, 204, 153, 0.3);
}

.nft-creator.nft-creator-success .btn:hover, .nft-creator.nft-creator-success .btn:focus, .nft-creator.nft-creator-success .btn:active, .nft-creator.nft-creator-success .btn.active, .nft-creator.nft-creator-success .btn.focus {
    background-color: #36b580 !important;
    border-color: #36b580 !important;
    color: #0B1118 !important;
}

.nft-creator.nft-creator-success .bg-soft {
    background-color: rgba(82, 204, 153, 0.1) !important;
    border: 1px solid rgba(82, 204, 153, 0.1) !important;
    color: #52cc99 !important;
}

.nft-creator.nft-creator-success .read-more:hover {
    color: #52cc99 !important;
}

.nft-creator.nft-creator-warning .content .author .name:hover {
    color: #ffbf66 !important;
}

.nft-creator.nft-creator-warning .btn {
    background-color: #ffbf66 !important;
    border: 1px solid #ffbf66 !important;
    color: #0B1118 !important;
    box-shadow: 0 3px 5px 0 rgba(255, 191, 102, 0.3);
}

.nft-creator.nft-creator-warning .btn:hover, .nft-creator.nft-creator-warning .btn:focus, .nft-creator.nft-creator-warning .btn:active, .nft-creator.nft-creator-warning .btn.active, .nft-creator.nft-creator-warning .btn.focus {
    background-color: #ffaa33 !important;
    border-color: #ffaa33 !important;
    color: #0B1118 !important;
}

.nft-creator.nft-creator-warning .bg-soft {
    background-color: rgba(255, 191, 102, 0.1) !important;
    border: 1px solid rgba(255, 191, 102, 0.1) !important;
    color: #ffbf66 !important;
}

.nft-creator.nft-creator-warning .read-more:hover {
    color: #ffbf66 !important;
}

.nft-creator.nft-creator-info .content .author .name:hover {
    color: #66ccff !important;
}

.nft-creator.nft-creator-info .btn {
    background-color: #66ccff !important;
    border: 1px solid #66ccff !important;
    color: #0B1118 !important;
    box-shadow: 0 3px 5px 0 rgba(102, 204, 255, 0.3);
}

.nft-creator.nft-creator-info .btn:hover, .nft-creator.nft-creator-info .btn:focus, .nft-creator.nft-creator-info .btn:active, .nft-creator.nft-creator-info .btn.active, .nft-creator.nft-creator-info .btn.focus {
    background-color: #33bbff !important;
    border-color: #33bbff !important;
    color: #0B1118 !important;
}

.nft-creator.nft-creator-info .bg-soft {
    background-color: rgba(102, 204, 255, 0.1) !important;
    border: 1px solid rgba(102, 204, 255, 0.1) !important;
    color: #66ccff !important;
}

.nft-creator.nft-creator-info .read-more:hover {
    color: #66ccff !important;
}

.nft-creator.nft-creator-danger .content .author .name:hover {
    color: #ff6647 !important;
}

.nft-creator.nft-creator-danger .btn {
    background-color: #ff6647 !important;
    border: 1px solid #ff6647 !important;
    color: #0B1118 !important;
    box-shadow: 0 3px 5px 0 rgba(255, 102, 71, 0.3);
}

.nft-creator.nft-creator-danger .btn:hover, .nft-creator.nft-creator-danger .btn:focus, .nft-creator.nft-creator-danger .btn:active, .nft-creator.nft-creator-danger .btn.active, .nft-creator.nft-creator-danger .btn.focus {
    background-color: #ff3c14 !important;
    border-color: #ff3c14 !important;
    color: #0B1118 !important;
}

.nft-creator.nft-creator-danger .bg-soft {
    background-color: rgba(255, 102, 71, 0.1) !important;
    border: 1px solid rgba(255, 102, 71, 0.1) !important;
    color: #ff6647 !important;
}

.nft-creator.nft-creator-danger .read-more:hover {
    color: #ff6647 !important;
}

.nft-creator.nft-creator-dark .content .author .name:hover {
    color: #ffffff !important;
}

.nft-creator.nft-creator-dark .btn {
    background-color: #ffffff !important;
    border: 1px solid #ffffff !important;
    color: #0B1118 !important;
    box-shadow: 0 3px 5px 0 rgba(255, 255, 255, 0.3);
}

.nft-creator.nft-creator-dark .btn:hover, .nft-creator.nft-creator-dark .btn:focus, .nft-creator.nft-creator-dark .btn:active, .nft-creator.nft-creator-dark .btn.active, .nft-creator.nft-creator-dark .btn.focus {
    background-color: #e6e6e6 !important;
    border-color: #e6e6e6 !important;
    color: #0B1118 !important;
}

.nft-creator.nft-creator-dark .bg-soft {
    background-color: rgba(255, 255, 255, 0.1) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    color: #ffffff !important;
}

.nft-creator.nft-creator-dark .read-more:hover {
    color: #ffffff !important;
}

.nft-creator.nft-creator-muted .content .author .name:hover {
    color: #9bacc4 !important;
}

.nft-creator.nft-creator-muted .btn {
    background-color: #9bacc4 !important;
    border: 1px solid #9bacc4 !important;
    color: #0B1118 !important;
    box-shadow: 0 3px 5px 0 rgba(155, 172, 196, 0.3);
}

.nft-creator.nft-creator-muted .btn:hover, .nft-creator.nft-creator-muted .btn:focus, .nft-creator.nft-creator-muted .btn:active, .nft-creator.nft-creator-muted .btn.active, .nft-creator.nft-creator-muted .btn.focus {
    background-color: #7b91b1 !important;
    border-color: #7b91b1 !important;
    color: #0B1118 !important;
}

.nft-creator.nft-creator-muted .bg-soft {
    background-color: rgba(155, 172, 196, 0.1) !important;
    border: 1px solid rgba(155, 172, 196, 0.1) !important;
    color: #9bacc4 !important;
}

.nft-creator.nft-creator-muted .read-more:hover {
    color: #9bacc4 !important;
}

.nft-creator.nft-creator-light .content .author .name:hover {
    color: #151c2b !important;
}

.nft-creator.nft-creator-light .btn {
    background-color: #151c2b !important;
    border: 1px solid #151c2b !important;
    color: #0B1118 !important;
    box-shadow: 0 3px 5px 0 rgba(21, 28, 43, 0.3);
}

.nft-creator.nft-creator-light .btn:hover, .nft-creator.nft-creator-light .btn:focus, .nft-creator.nft-creator-light .btn:active, .nft-creator.nft-creator-light .btn.active, .nft-creator.nft-creator-light .btn.focus {
    background-color: #040609 !important;
    border-color: #040609 !important;
    color: #0B1118 !important;
}

.nft-creator.nft-creator-light .bg-soft {
    background-color: rgba(21, 28, 43, 0.1) !important;
    border: 1px solid rgba(21, 28, 43, 0.1) !important;
    color: #151c2b !important;
}

.nft-creator.nft-creator-light .read-more:hover {
    color: #151c2b !important;
}

.nft-creator.nft-creator-footer .content .author .name:hover {
    color: #101822 !important;
}

.nft-creator.nft-creator-footer .btn {
    background-color: #101822 !important;
    border: 1px solid #101822 !important;
    color: #0B1118 !important;
    box-shadow: 0 3px 5px 0 rgba(16, 24, 34, 0.3);
}

.nft-creator.nft-creator-footer .btn:hover, .nft-creator.nft-creator-footer .btn:focus, .nft-creator.nft-creator-footer .btn:active, .nft-creator.nft-creator-footer .btn.active, .nft-creator.nft-creator-footer .btn.focus {
    background-color: black !important;
    border-color: black !important;
    color: #0B1118 !important;
}

.nft-creator.nft-creator-footer .bg-soft {
    background-color: rgba(16, 24, 34, 0.1) !important;
    border: 1px solid rgba(16, 24, 34, 0.1) !important;
    color: #101822 !important;
}

.nft-creator.nft-creator-footer .read-more:hover {
    color: #101822 !important;
}

.nft-collection.nft-col-white .content .author .name:hover,
.nft-collection.nft-col-white .content .title:hover {
    color: #0B1118 !important;
}

.nft-collection.nft-col-white .content .bg-soft {
    background-color: rgba(11, 17, 24, 0.1) !important;
    border: 1px solid rgba(11, 17, 24, 0.1) !important;
    color: #0B1118 !important;
}

.nft-collection.nft-col-primary .content .author .name:hover,
.nft-collection.nft-col-primary .content .title:hover {
    color: #6666ff !important;
}

.nft-collection.nft-col-primary .content .bg-soft {
    background-color: rgba(102, 102, 255, 0.1) !important;
    border: 1px solid rgba(102, 102, 255, 0.1) !important;
    color: #6666ff !important;
}

.nft-collection.nft-col-secondary .content .author .name:hover,
.nft-collection.nft-col-secondary .content .title:hover {
    color: #5a6d90 !important;
}

.nft-collection.nft-col-secondary .content .bg-soft {
    background-color: rgba(90, 109, 144, 0.1) !important;
    border: 1px solid rgba(90, 109, 144, 0.1) !important;
    color: #5a6d90 !important;
}

.nft-collection.nft-col-success .content .author .name:hover,
.nft-collection.nft-col-success .content .title:hover {
    color: #52cc99 !important;
}

.nft-collection.nft-col-success .content .bg-soft {
    background-color: rgba(82, 204, 153, 0.1) !important;
    border: 1px solid rgba(82, 204, 153, 0.1) !important;
    color: #52cc99 !important;
}

.nft-collection.nft-col-warning .content .author .name:hover,
.nft-collection.nft-col-warning .content .title:hover {
    color: #ffbf66 !important;
}

.nft-collection.nft-col-warning .content .bg-soft {
    background-color: rgba(255, 191, 102, 0.1) !important;
    border: 1px solid rgba(255, 191, 102, 0.1) !important;
    color: #ffbf66 !important;
}

.nft-collection.nft-col-info .content .author .name:hover,
.nft-collection.nft-col-info .content .title:hover {
    color: #66ccff !important;
}

.nft-collection.nft-col-info .content .bg-soft {
    background-color: rgba(102, 204, 255, 0.1) !important;
    border: 1px solid rgba(102, 204, 255, 0.1) !important;
    color: #66ccff !important;
}

.nft-collection.nft-col-danger .content .author .name:hover,
.nft-collection.nft-col-danger .content .title:hover {
    color: #ff6647 !important;
}

.nft-collection.nft-col-danger .content .bg-soft {
    background-color: rgba(255, 102, 71, 0.1) !important;
    border: 1px solid rgba(255, 102, 71, 0.1) !important;
    color: #ff6647 !important;
}

.nft-collection.nft-col-dark .content .author .name:hover,
.nft-collection.nft-col-dark .content .title:hover {
    color: #ffffff !important;
}

.nft-collection.nft-col-dark .content .bg-soft {
    background-color: rgba(255, 255, 255, 0.1) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    color: #ffffff !important;
}

.nft-collection.nft-col-muted .content .author .name:hover,
.nft-collection.nft-col-muted .content .title:hover {
    color: #9bacc4 !important;
}

.nft-collection.nft-col-muted .content .bg-soft {
    background-color: rgba(155, 172, 196, 0.1) !important;
    border: 1px solid rgba(155, 172, 196, 0.1) !important;
    color: #9bacc4 !important;
}

.nft-collection.nft-col-light .content .author .name:hover,
.nft-collection.nft-col-light .content .title:hover {
    color: #151c2b !important;
}

.nft-collection.nft-col-light .content .bg-soft {
    background-color: rgba(21, 28, 43, 0.1) !important;
    border: 1px solid rgba(21, 28, 43, 0.1) !important;
    color: #151c2b !important;
}

.nft-collection.nft-col-footer .content .author .name:hover,
.nft-collection.nft-col-footer .content .title:hover {
    color: #101822 !important;
}

.nft-collection.nft-col-footer .content .bg-soft {
    background-color: rgba(16, 24, 34, 0.1) !important;
    border: 1px solid rgba(16, 24, 34, 0.1) !important;
    color: #101822 !important;
}

body {
    color: #ffffff;
}

::selection {
    color: #ffffff;
}

.bg-overlay {
    background-color: rgba(11, 17, 24, 0.7);
}

.bg-overlay-white {
    background-color: rgba(0, 0, 0, 0.4);
}

.text-shadow-title {
    text-shadow: 2px 0 0 #ffffff, -2px 0 0 #ffffff, 0 4px 0 rgba(255, 255, 255, 0.4), 0 -2px 0 #ffffff, 1px 1px #ffffff, -1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff;
}

.title-dark {
    color: #ffffff !important;
}

.para-dark {
    color: #9bacc4 !important;
}

.title-white {
    color: #0B1118 !important;
}

.title-bg-dark {
    background: #ffffff !important;
}

.bg-white-dark {
    background: #0B1118 !important;
}

.apps-links:hover {
    background: #151c2b;
    box-shadow: 0 0 3px rgba(255, 255, 255, 0.15);
}

.apps-links:hover .icon {
    color: #6666ff !important;
}

.apps-links:hover .app-name {
    color: #ffffff !important;
}

#style-switcher .t-dark,
#style-switcher .t-rtl-light,
#style-switcher .t-ltr-dark {
    display: none;
}

#style-switcher .t-light,
#style-switcher .t-rtl-dark {
    display: inline-block;
}

#topnav .logo {
    color: #ffffff !important;
}

#topnav .logo .l-dark,
#topnav .logo .logo-light-mode {
    display: none !important;
}

#topnav .logo .l-light,
#topnav .logo .logo-dark-mode {
    display: inline-block !important;
}

#topnav .has-submenu.active a {
    color: #0B1118;
}

#topnav .has-submenu .submenu .submenu-arrow {
    border: solid #ced4da;
    border-width: 0 2px 2px 0;
}

#topnav .navbar-toggle span {
    background-color: #ffffff;
}

#topnav .buy-button .login-btn-primary {
    display: inline-block;
}

#topnav .buy-button .login-btn-light {
    display: none;
}

#topnav .buy-button .nav-light-icon-dark {
    display: inline-block;
}

#topnav .buy-button .nav-light-icon-white {
    display: none;
}

#topnav .navigation-menu > li > a {
    color: #ced4da;
}

#topnav .navigation-menu > li .submenu.megamenu li .megamenu-head {
    color: #ffffff !important;
}

#topnav .navigation-menu .has-submenu .menu-arrow {
    border: solid #ced4da;
    border-width: 0 2px 2px 0;
}

#topnav.scroll {
    background-color: #0B1118;
    box-shadow: 0 0 3px rgba(255, 255, 255, 0.15);
}

#topnav.scroll .navigation-menu > li > a {
    color: #ffffff;
}

#topnav.scroll .navigation-menu > li > .menu-arrow {
    border-color: #ffffff;
}

#topnav.nav-sticky {
    background: #0B1118;
    box-shadow: 0 0 3px rgba(255, 255, 255, 0.15);
}

#topnav.nav-sticky .navigation-menu.nav-light > li > a {
    color: #ced4da;
}

#topnav.nav-sticky .navigation-menu.nav-light .has-submenu .menu-arrow {
    border-color: #ffffff;
}

#topnav.nav-sticky .navigation-menu > li:hover > .menu-arrow, #topnav.nav-sticky .navigation-menu > li.active > .menu-arrow {
    border-color: #6666ff !important;
}

#topnav.nav-sticky .navigation-menu > li:hover > a,
#topnav.nav-sticky .navigation-menu > li.active > a {
    color: #6666ff !important;
}

#topnav.nav-sticky .logo.logo-light {
    color: #ffffff !important;
}

#topnav.nav-sticky .buy-button .login-btn-primary {
    display: none;
}

#topnav.nav-sticky .buy-button .login-btn-light {
    display: inline-block;
}

#topnav.nav-sticky .buy-button .nav-light-icon-dark {
    display: none;
}

#topnav.nav-sticky .buy-button .nav-light-icon-white {
    display: inline-block;
}

@media (min-width: 992px) {
    #topnav .navigation-menu > li .submenu {
        background-color: #0B1118;
        box-shadow: 0 0 3px rgba(255, 255, 255, 0.15);
    }

    #topnav .navigation-menu > li .submenu li a {
        color: #ced4da !important;
    }

    #topnav .navigation-menu > li:hover > .menu-arrow, #topnav .navigation-menu > li.active > .menu-arrow {
        border-color: #ffffff !important;
    }

    #topnav .navigation-menu > li:hover > a,
    #topnav .navigation-menu > li.active > a {
        color: #ffffff !important;
    }

    #topnav .navigation-menu.nav-light > li > a {
        color: #ced4da;
    }
}

@media (max-width: 991px) {
    #topnav {
        background-color: #0B1118;
        box-shadow: 0 0 3px rgba(255, 255, 255, 0.15);
    }

    #topnav .navigation-menu > li .submenu li a {
        color: #ffffff !important;
    }

    #topnav .navigation-menu > li .submenu.megamenu > li > ul > li > span {
        color: #9bacc4;
    }

    #topnav .navigation-menu > li > a {
        color: #ffffff;
    }

    #topnav .menu-extras .menu-item {
        border-color: #9bacc4;
    }

    #topnav .buy-button .login-btn-primary {
        display: none !important;
    }

    #topnav .buy-button .login-btn-light {
        display: inline-block;
    }

    #topnav .buy-button .nav-light-icon-dark {
        display: none !important;
    }

    #topnav .buy-button .nav-light-icon-white {
        display: inline-block;
    }

    #navigation {
        border-top: 1px solid #121824;
        border-bottom: 1px solid #121824;
        background-color: #0B1118;
    }
}

.sidebar-nav > .navbar-item .navbar-link {
    color: #9bacc4 !important;
}
`;

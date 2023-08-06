type SvgProps = {
  className: string;
};

function LogoIcon({ className }: SvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 64 24"
      className={className}
      aria-hidden="true"
      role="presentation"
      focusable="false"
      data-testid="svg-icon"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M27.642 22.11V8.319l3.411-.665v15.15l-3.411-.694zm8.919-8.294c0-4.117 2.437-5.341 6.187-6.196l1.966-.318v3.555l-1.966.36c-1.69.322-2.775 1.191-2.775 3.115v8.471l-3.412-.693v-8.294zm-14.427-.495v9.482l-3.411-.693v-8.79c0-1.503-1.099-2.573-2.718-2.573s-2.718 1.07-2.718 2.574v9.482l-3.411-.693v-8.79c0-1.503-1.099-2.573-2.718-2.573-1.648 0-2.746 1.07-2.746 2.574v9.482L1 22.11V8.319l3.412-.665v1.561c.954-1.156 2.4-1.88 4.047-1.88 1.34 0 2.98.742 3.907 2.069.929-1.209 2.482-2.002 4.388-2.028 2.4-.032 5.38 1.463 5.38 5.945zm33.278 9.8c-4.738 0-7.907-3.168-7.907-7.907s3.169-7.878 7.907-7.878c4.564 0 7.588 3.14 7.588 7.878 0 4.739-3.024 7.908-7.588 7.908zm0-3.197c2.471 0 4.1-1.89 4.1-4.71 0-2.82-1.629-4.68-4.1-4.68-2.645 0-4.419 1.86-4.419 4.68 0 2.82 1.774 4.71 4.42 4.71zM29.42 5.294c-1.289 0-2.15-.862-2.15-2.151 0-1.29.861-2.143 2.15-2.143 1.241 0 2.064.854 2.064 2.143 0 1.289-.823 2.15-2.064 2.15z"
      ></path>
    </svg>
  );
}

function SettingIcon({ className }: SvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 512 512"
      className={className}
    >
      <path
        fill="currentColor"
        d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"
      />
    </svg>
  );
}

function ExportIcon({ className }: SvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 576 512"
      className={className}
    >
      <path
        fill="currentColor"
        d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V288H216c-13.3 0-24 10.7-24 24s10.7 24 24 24H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM384 336V288H494.1l-39-39c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l80 80c9.4 9.4 9.4 24.6 0 33.9l-80 80c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l39-39H384zm0-208H256V0L384 128z"
      />
    </svg>
  );
}

function CursorIcon({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11 4h10m-6 4h2m-12.5943-1.9315 9.4348 9.246c.3148.3085.135.8732-.2891.9084h-5.0514a.4679.4679 0 0 0-.285.1305l-3.4076 3.7094c-.3128.2998-.8074.0604-.8074-.3909v-13.41c0-.227.25-.346.4057-.1934Z"
      ></path>
      <path
        fill="currentColor"
        d="m13.8405 15.3145-9.4348-9.246c-.1558-.1527-.4057-.0335-.4057.1935v13.4099c0 .4513.4946.6907.8074.3909l3.4075-3.7094a.4679.4679 0 0 1 .2851-.1305h5.0514c.4241-.0352.6039-.5999.2891-.9084Z"
      ></path>
    </svg>
  );
}

function ReactionIcon({ className }: SvgProps) {
  return (
    <svg
      width="1em"
      height="1em"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      role="presentation"
      focusable="false"
      data-testid="svg-icon"
    >
      <path
        d="M18.483 15.982a2 2 0 0 1-.81.663l-14.11 6.309a2 2 0 0 1-2.642-2.642L7.23 6.202a2 2 0 0 1 .376-.561c.298.615.695 1.286 1.177 1.987l-6.036 13.5 13.717-6.133c.733.444 1.416.779 2.02.988z"
        fill="currentColor"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.448 13.89c-.447-1.065-1.366-2.43-2.7-3.764-1.333-1.333-2.698-2.252-3.763-2.699a4.585 4.585 0 0 0-.691-.234c.045.185.118.415.234.69.447 1.065 1.366 2.43 2.7 3.764 1.333 1.334 2.699 2.253 3.763 2.7.276.116.506.19.691.234a4.582 4.582 0 0 0-.234-.691zm.716.748h-.002.002zM8.812 7.136h.002-.002zm9.502 9.077c1.201-1.201-.21-4.56-3.151-7.5C12.22 5.77 8.863 4.36 7.662 5.56c-1.201 1.2.21 4.56 3.151 7.5 2.942 2.942 6.3 4.353 7.501 3.152z"
        fill="currentColor"
      ></path>
      <path
        d="M15.288 3.386a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0z"
        fill="currentColor"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.425 10.887a1 1 0 0 1-1 1H20.49a1 1 0 0 1 0-2h1.936a1 1 0 0 1 1 1zM21.99 1.818a1 1 0 0 1 .866 1.117l-.305 2.428a1 1 0 0 1-1.101.87l-2.444-.268-.183 1.453a1 1 0 0 1-1.984-.25l.306-2.429a1 1 0 0 1 1.1-.87l2.444.268.183-1.452a1 1 0 0 1 1.117-.867z"
        fill="currentColor"
      ></path>
    </svg>
  );
}

function ChatIcon({ className }: SvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      role="presentation"
      focusable="false"
      data-testid="svg-icon"
    >
      <path
        fill="currentColor"
        d="M4 6v12.006L9.828 18 12 20.172 14.172 18h5.822L20 6H4zm0-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5l-3 3-3-3H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm7 5a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2h-6zm0 4a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2h-6zM7 9a1 1 0 1 0 0 2h1a1 1 0 0 0 0-2H7zm0 4a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2H7z"
      ></path>
    </svg>
  );
}

function BellIcon({ className }: SvgProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      role="presentation"
      focusable="false"
      data-testid="svg-icon"
    >
      <g
        xmlns="http://www.w3.org/2000/svg"
        strokeWidth="2"
        stroke="currentColor"
        fillRule="evenodd"
        fill="none"
      >
        <path d="M12 4a5 5 0 0 0-5 5v3.303L3.869 17H20.13L17 12.303V9a5 5 0 0 0-5-5zM10 17v1a2 2 0 1 0 4 0v-1h-4z"></path>
      </g>
    </svg>
  );
}

function DownArrowIcon({ className }: SvgProps) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      role="presentation"
      focusable="false"
      data-testid="svg-icon"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.707 6.293a1 1 0 0 0-1.414 1.414L8 11.414l3.707-3.707a1 1 0 0 0-1.414-1.414L8 8.586 5.707 6.293Z"
        fill="currentColor"
      ></path>
    </svg>
  );
}

export function PeopleIcon({ className }: SvgProps) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 18"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M14 3a3 3 0 1 1-1.614 5.53M15 12a4 4 0 0 1 4 4v1h-3.348M10 4.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM5 11h3a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z"
      />
    </svg>
  );
}

export function ThreeDotsIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        fill="currentColor"
        d="M6 12c0 1.1046-.8954 2-2 2s-2-.8954-2-2 .8954-2 2-2 2 .8954 2 2ZM14 12c0 1.1046-.8954 2-2 2s-2-.8954-2-2 .8954-2 2-2 2 .8954 2 2ZM22 12c0 1.1046-.8954 2-2 2s-2-.8954-2-2 .8954-2 2-2 2 .8954 2 2Z"
      ></path>
      <path
        stroke="currentColor"
        strokeWidth="var(--svg-stroke-width)"
        d="m22 21.0003.001-.0003"
      ></path>
    </svg>
  );
}

export function CloseIcon(props: SvgProps) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      aria-hidden="true"
      role="presentation"
      focusable="false"
      data-testid="svg-icon"
    >
      <path
        d="m5 5 14 14M19 5 5 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="bevel"
      ></path>
    </svg>
  );
}

export function FillIcon(props: SvgProps) {
  return (
    <svg
      {...props}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 18"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m2.133 2.6 5.856 6.9L8 14l4 3 .011-7.5 5.856-6.9a1 1 0 0 0-.804-1.6H2.937a1 1 0 0 0-.804 1.6Z"
      />
    </svg>
  );
}

export function FrameIcon(props: SvgProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      {...props}
      aria-hidden="true"
      role="presentation"
      focusable="false"
      data-testid="svg-icon"
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M6 5h12V3a1 1 0 0 1 2 0v2h2a1 1 0 0 1 0 2h-2v10h2a1 1 0 0 1 0 2h-2v2a1 1 0 0 1-2 0v-2H6v2a1 1 0 0 1-2 0v-2H2a1 1 0 0 1 0-2h2V7H2a1 1 0 1 1 0-2h2V3a1 1 0 1 1 2 0v2zm0 2h12v10H6V7zm3 2a1 1 0 1 0 0 2h6a1 1 0 0 0 0-2H9zm0 4a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2H9z"
        fillRule="evenodd"
        fill="currentColor"
      ></path>
    </svg>
  );
}

export function HistoryIcon(props: SvgProps) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      {...props}
      aria-hidden="true"
      role="presentation"
      focusable="false"
      data-testid="svg-icon"
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        d="M5 12V12.5858L6.29289 11.2929C6.68342 10.9024 7.31658 10.9024 7.70711 11.2929C8.09763 11.6834 8.09763 12.3166 7.70711 12.7071L4 16.4142L0.292893 12.7071C-0.0976311 12.3166 -0.0976311 11.6834 0.292893 11.2929C0.683417 10.9024 1.31658 10.9024 1.70711 11.2929L3 12.5858V12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.4477 21 11 20.5523 11 20C11 19.4477 11.4477 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12Z"
      ></path>
      <path
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        d="M13.9498 8.41422C14.3403 8.02369 14.9734 8.02369 15.364 8.41422C15.7545 8.80474 15.7545 9.43791 15.364 9.82843L13.7841 11.4083C13.9211 12.0493 13.7407 12.7446 13.2426 13.2426C12.4616 14.0237 11.1953 14.0237 10.4142 13.2426C9.63317 12.4616 9.63317 11.1953 10.4142 10.4142C10.9623 9.86609 11.7495 9.70263 12.4401 9.92383L13.9498 8.41422Z"
      ></path>
    </svg>
  );
}

export function VideoPlayIcon(props: SvgProps) {
  return (
    <svg
      {...props}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 14 16"
    >
      <path d="M0 .984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L1.506.139A1 1 0 0 0 0 .984Z" />
    </svg>
  );
}

export function PlusIcon(props: SvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
      aria-hidden="true"
      role="presentation"
      focusable="false"
      data-testid="svg-icon"
    >
      <path
        fill="currentColor"
        d="M18 13h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5V6a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2z"
      ></path>
    </svg>
  );
}

export function ListIcon(props: SvgProps) {
  return (
    <svg
      {...props}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 21 18"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9.5 3h9.563M9.5 9h9.563M9.5 15h9.563M1.5 13a2 2 0 1 1 3.321 1.5L1.5 17h5m-5-15 2-1v6m-2 0h4"
      />
    </svg>
  );
}

export function LayerIcon(props: SvgProps) {
  return (
    <svg
      {...props}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 18"
    >
      <path d="M18 0H6a2 2 0 0 0-2 2h14v12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Z" />
      <path d="M14 4H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM2 16v-6h12v6H2Z" />
    </svg>
  );
}

export function RestoreIcon(props: SvgProps) {
  return (
    <svg
      {...props}
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      data-testid="al-restore-button"
    >
      <path
        d="M8 14a6 6 0 1 0-6-6v.586l-.293-.293A1 1 0 0 0 .293 9.707L3 12.414l2.707-2.707a1 1 0 0 0-1.414-1.414L4 8.586V8a4 4 0 1 1 4 4 1 1 0 1 0 0 2Z"
        fill="currentColor"
      ></path>
    </svg>
  );
}

export function BugetIcon(props: SvgProps) {
  return (
    <svg
      {...props}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 16"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 5h6M9 8h6m-6 3h6M4.996 5h.01m-.01 3h.01m-.01 3h.01M2 1h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"
      />
    </svg>
  );
}

export function BgTransparentIcon(props: SvgProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      {...props}
      aria-hidden="true"
      role="presentation"
      focusable="false"
      data-testid="card-background-item__icon"
      width="24"
      height="24"
    >
      <g
        xmlns="http://www.w3.org/2000/svg"
        transform="translate(1 1)"
        fillRule="evenodd"
        fill="#000"
      >
        <circle fillOpacity=".04" r="11" cy="11" cx="11"></circle>
        <path
          d="M17 20.221V17h3.221A11.06 11.06 0 0 1 17 20.221zm-12 0A11.06 11.06 0 0 1 1.779 17H5v3.221zM20.221 5H17V1.779A11.06 11.06 0 0 1 20.221 5zM9 .181V1H6.411A10.919 10.919 0 0 1 9 .181zM15.589 1H13V.181c.907.167 1.775.445 2.589.819zM13 21.819V21h2.589c-.814.374-1.682.652-2.589.819zm-4 0A10.919 10.919 0 0 1 6.411 21H9v.819zm-8-6.23A10.919 10.919 0 0 1 .181 13H1v2.589zm0-9.178V9H.181C.348 8.093.626 7.225 1 6.411zM21.819 9H21V6.411c.374.814.652 1.682.819 2.589zM21 15.589V13h.819A10.919 10.919 0 0 1 21 15.589zM5 1.779V5H1.779A11.06 11.06 0 0 1 5 1.779zM5 13h4v4H5v-4zm8 0h4v4h-4v-4zM5 5h4v4H5V5zm8 0h4v4h-4V5zm0 12v4H9v-4h4zm8-8v4h-4V9h4zm-8 0v4H9V9h4zM5 9v4H1V9h4zm8-8v4H9V1h4z"
          fillOpacity=".12"
        ></path>
      </g>
    </svg>
  );
}

export function UnLockIcon(props: SvgProps) {
  return (
    <svg
      {...props}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M18.5 8V4.5a3.5 3.5 0 1 0-7 0V8M8 12.167v3M2 8h12a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"
      />
    </svg>
  );
}

export function LockIcon(props: SvgProps) {
  return (
    <svg
      {...props}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 20"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11.5 8V4.5a3.5 3.5 0 1 0-7 0V8M8 12v3M2 8h12a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"
      />
    </svg>
  );
}

export {
  LogoIcon,
  SettingIcon,
  ExportIcon,
  CursorIcon,
  ReactionIcon,
  ChatIcon,
  BellIcon,
  DownArrowIcon,
};

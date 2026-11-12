import { Link, useNavigate } from 'react-router-dom';
import { useUi } from '../hooks/useUi';

const BG = '#4566EC';
const DECOR = '#5677FF';

function Decor({ box, className, children }) {
  const [x, y, w, h] = box;
  return (
    <svg
      className={`pointer-events-none absolute ${className}`}
      viewBox={`${x} ${y} ${w} ${h}`}
      style={{ aspectRatio: `${w} / ${h}` }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function HeroDecor() {
  return (
    <>
      {/* Top-left zigzag */}
      <Decor box={[0, 0, 125, 195]} className="left-0 top-0 w-[125px] md:w-[140px] lg:w-[175px] xl:w-[200px] 2xl:w-[240px]">
        <path
          d="M97.3595 134.019L120.545 111.965L116.41 107.617L97.5715 125.537L79.3073 106.336L57.5706 127.012L41.3741 109.985L19.6374 130.662L3.09619 113.272L-19.0028 134.294L-14.8675 138.641L2.88414 121.755L19.4253 139.144L41.162 118.468L57.3586 135.495L79.0953 114.819L97.3595 134.019ZM97.6422 151.002L120.828 128.947L116.693 124.6L97.8543 142.52L79.5901 123.319L57.8534 143.995L41.6568 126.968L19.9201 147.645L3.37897 130.255L-18.72 151.276L-14.5847 155.624L3.16692 138.738L19.7081 156.127L41.4448 135.451L57.6413 152.478L79.378 131.802L97.6422 151.002ZM121.111 145.93L97.925 167.985L79.6608 148.785L57.9241 169.461L41.7276 152.434L19.9909 173.11L3.44971 155.721L-14.3019 172.607L-18.4372 168.259L3.66176 147.238L20.2029 164.628L41.9396 143.951L58.1362 160.978L79.8729 140.302L98.1371 159.503L116.976 141.583L121.111 145.93ZM98.2078 184.968L121.394 162.913L117.258 158.566L98.4199 176.486L80.1557 157.285L58.419 177.961L42.2224 160.934L20.4857 181.611L3.94454 164.221L-18.1544 185.242L-14.0192 189.59L3.73249 172.704L20.2737 190.093L42.0104 169.417L58.2069 186.444L79.9436 165.767L98.2078 184.968Z"
          fillRule="evenodd"
          clipRule="evenodd"
          fill={DECOR}
        />
      </Decor>

      {/* Bottom-right zigzag */}
      <Decor box={[264, 434, 126, 118]} className="bottom-0 right-0 w-[126px] md:w-[140px] lg:w-[175px] xl:w-[200px] 2xl:w-[240px]">
        <path
          d="M381.359 462.019L404.545 439.965L400.41 435.617L381.572 453.537L363.307 434.336L341.571 455.012L325.374 437.985L303.637 458.662L287.096 441.272L264.997 462.294L269.132 466.641L286.884 449.755L303.425 467.144L325.162 446.468L341.359 463.495L363.095 442.819L381.359 462.019ZM381.642 479.002L404.828 456.947L400.693 452.6L381.854 470.52L363.59 451.319L341.853 471.995L325.657 454.968L303.92 475.645L287.379 458.255L265.28 479.276L269.415 483.624L287.167 466.738L303.708 484.127L325.445 463.451L341.641 480.478L363.378 459.802L381.642 479.002ZM405.111 473.93L381.925 495.985L363.661 476.785L341.924 497.461L325.728 480.434L303.991 501.11L287.45 483.721L269.698 500.607L265.563 496.259L287.662 475.238L304.203 492.628L325.94 471.951L342.136 488.978L363.873 468.302L382.137 487.503L400.976 469.583L405.111 473.93ZM382.208 512.968L405.394 490.913L401.258 486.566L382.42 504.486L364.156 485.285L342.419 505.961L326.222 488.934L304.486 509.611L287.945 492.221L265.846 513.242L269.981 517.59L287.732 500.704L304.274 518.093L326.01 497.417L342.207 514.444L363.944 493.767L382.208 512.968Z"
          fillRule="evenodd"
          clipRule="evenodd"
          fill={DECOR}
        />
      </Decor>

      {/* Top-right ring — centre (364, -2); only the inner quarter shows */}
      <Decor box={[320, 0, 70, 42]} className="right-0 top-0 w-[70px] md:w-[78px] lg:w-[98px] xl:w-[110px] 2xl:w-[130px]">
        <path
          d="M408 -2C408 22.3005 388.3 42 364 42C339.699 42 320 22.3005 320 -2C320 -26.3005 339.699 -46 364 -46C388.3 -46 408 -26.3005 408 -2ZM338.817 -2C338.817 11.9079 350.092 23.1825 364 23.1825C377.908 23.1825 389.182 11.9079 389.182 -2C389.182 -15.9079 377.908 -27.1825 364 -27.1825C350.092 -27.1825 338.817 -15.9079 338.817 -2Z"
          fill={DECOR}
          fillRule="evenodd"
        />
      </Decor>
    </>
  );
}

export default function Onboarding() {
  const navigate = useNavigate();
  const { finishOnboarding } = useUi();

  const start = () => {
    finishOnboarding();
    navigate('/register');
  };

  return (
    <div className="flex min-h-[100dvh] w-full flex-col bg-[#4566EC] lg:flex-row">

      <div className="relative min-h-[9rem] min-w-0 flex-1 overflow-hidden bg-[#4566EC] lg:min-h-[100dvh]">
        <HeroDecor />
      </div>

      <section
        className="
          flex min-h-[292px] w-full shrink-0 flex-col bg-white px-6 pb-8 pt-6
          lg:min-h-[100dvh] lg:w-[min(42vw,36rem)] lg:justify-center lg:px-12 lg:py-16
          xl:w-[min(40vw,42rem)] xl:px-16 xl:py-20
          2xl:w-[min(38vw,48rem)] 2xl:px-20 2xl:py-24
        "
      >
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col lg:max-w-lg lg:flex-none lg:gap-16 xl:max-w-xl xl:gap-20 2xl:max-w-2xl 2xl:gap-24">
          <div>
            <h1 className="max-w-[246px] text-2xl font-semibold leading-9 text-black lg:max-w-none lg:text-3xl lg:leading-tight xl:text-4xl 2xl:text-5xl 2xl:leading-tight">
              Manage What To Do
            </h1>
            <p className="mt-4 max-w-[307px] text-xs leading-[18px] text-[#717171] lg:mt-6 lg:max-w-none lg:text-base lg:leading-relaxed xl:text-lg 2xl:text-xl 2xl:leading-relaxed">
              The best way to manage what you have to do, don&apos;t forget your plans
            </p>
          </div>

          <div className="mt-auto pt-6 lg:mt-0 lg:pt-0">
            <button
              type="button"
              onClick={start}
              className="flex h-12 w-full items-center justify-center rounded-lg text-base font-medium leading-5 text-white transition hover:opacity-90 active:scale-[0.99] lg:h-14 lg:text-lg xl:h-16 xl:rounded-xl xl:text-xl"
              style={{ background: BG }}
            >
              Get Started
            </button>
            <p className="mt-3 text-center text-xs text-[#717171] lg:mt-5 lg:text-sm xl:text-base">
              Already have an account?{' '}
              <Link to="/login" className="font-medium hover:underline" style={{ color: BG }}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

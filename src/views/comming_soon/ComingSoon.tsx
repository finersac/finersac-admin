import { FC, ReactElement, useEffect, useRef } from "react";

import Countdown from "react-countdown";

require("./styles.css");
require("./util.css");

const Logo = require("assets/img/logo.png");

interface ComingSoonProps {
  children?: JSX.Element;
}

const ComingSoon: FC<ComingSoonProps> = (): ReactElement => {
  const countdownRef = useRef<Countdown | null>(null);

  useEffect(() => {
    return () => {
      countdownRef.current?.stop();
    };
  }, [countdownRef]);

  const renderBoxCountDown = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: any) => {
    return (
      <>
        <div className="flex-col-c-m size2 how-countdown">
          <span className="l1-txt3 p-b-9 days">{days}</span>
          <span className="s1-txt1">Days</span>
        </div>

        <div className="flex-col-c-m size2 how-countdown">
          <span className="l1-txt3 p-b-9 hours">{hours}</span>
          <span className="s1-txt1">Hours</span>
        </div>

        <div className="flex-col-c-m size2 how-countdown">
          <span className="l1-txt3 p-b-9 minutes">{minutes}</span>
          <span className="s1-txt1">Minutes</span>
        </div>

        <div className="flex-col-c-m size2 how-countdown">
          <span className="l1-txt3 p-b-9 seconds">{seconds}</span>
          <span className="s1-txt1">Seconds</span>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="bg-g1 size1 flex-w flex-col-c-sb p-l-15 p-r-15 p-t-55 p-b-35 respon1">
        <span></span>
        <div className="flex-col-c p-t-50 p-b-50">
          <img src={Logo} className="logo" />
          <h3 className="l1-txt1 txt-center p-b-10">Coming Soon</h3>

          <p className="txt-center l1-txt2 p-b-60">
            Our website is under construction
          </p>

          <div className="flex-w flex-c cd100 p-b-82">
            <Countdown
              ref={countdownRef}
              date={new Date("October 17 2022 23:59:59 GMT+0200")}
              renderer={renderBoxCountDown}
            />
          </div>
        </div>

        <span className="s1-txt3 txt-center">
          @Copyright. All rights reserved.
        </span>
      </div>
    </>
  );
};

export default ComingSoon;

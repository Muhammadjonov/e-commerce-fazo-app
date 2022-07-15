import { useState, useEffect } from "react";
import { useT } from "../../custom/hooks/useT";
import "./__style.scss";

interface ICountDownComp {
  repiteCode: (url: string) => void,
  url: string
}

const CountDownComp = (props: ICountDownComp) => {
  const { repiteCode, url } = props;
  const { t, lang } = useT();
  const initialMinute = 2, initialSeconds = 0;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);

  let interval: any;

  const startTimer = () => {
    interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
  }

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval);
    };
  }, [startTimer]);

  const onClickResendCode = () => {
    repiteCode(url);
    setMinutes(2);
    setSeconds(0);
    startTimer();
  }

  return (
    <div className="countdown__comp">
      {minutes === 0 && seconds === 0 ? (
        <button
          type="button"
          onClick={onClickResendCode}
          className="countdown__comp__resendbtn"
        >
          {t(`sendCodeAgain.${lang}`)}
        </button>
      ) : (
        <p className="countdown__comp__timer">
          {
            lang === "ru" ? (
              <>
                Отправить повторный код можно через{` `}
                <span className="countdown__comp__timer__time">
                  0{minutes} : {`${seconds < 10 ? "0" : ""}${seconds}`}
                </span>
              </>
            ) : lang === "uz" ? (
              <>
                Kodni{` `}
                <span className="countdown__comp__timer__time">
                  0{minutes} : {`${seconds < 10 ? "0" : ""}${seconds}`}</span> dan kegin qayta jo'natishingiz mumkin
              </>
            ) : null
          }

        </p>
      )
      }
    </div>
  );
};

export default CountDownComp;
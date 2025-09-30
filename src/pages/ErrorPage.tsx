import type { Dispatch, SetStateAction } from "react";
import type { UnitsState } from '../types/unitsState';
import { Header } from "../components/Header/Header";
import ErrorIcon from "../assets/images/icon-error.svg";
import RetryIcon from "../assets/images/icon-retry.svg";
import "./ErrorPage.css";

interface ErrorPageProps {
  units: UnitsState;
  setUnits: Dispatch<SetStateAction<UnitsState>>;
};

export function ErrorPage({ units, setUnits }: ErrorPageProps) {
  return (
    <>
      <Header units={units} setUnits={setUnits} />

      <div className="error-page__container" role="alert">
        <img 
          src={ErrorIcon} 
          alt="" 
          className="error-page__icon" 
          role="presentation" 
          aria-hidden="true" 
        />
        <h1 className="error-page__title">Something went wrong</h1>
        <p className="error-page__description">
          We couldn’t connect to the server (API error). Please try again in a few moments.
        </p>
        <button className="error-page__retry-button">
          <img 
            src={RetryIcon} 
            alt="" 
            className="error-page__retry-icon" 
            role="presentation" 
            aria-hidden="true" 
          />
          <span className="error-page__retry-text">Retry</span>
        </button>
      </div>
    </>
  );
}
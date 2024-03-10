import React from "react";
import { ArrowLeft } from "lucide-react";
import "@dotlottie/player-component";
import PropTypes from "prop-types";
// import { withRouter } from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // Render a fallback UI for errors
      return (
        <div className="py-10">
          <div className=" relative flex items-center justify-center">
            <dotlottie-player
              autoplay
              controls={false}
              loop
              playMode="normal"
              src="https://lottie.host/eaa4619c-5ba3-45ce-a9bb-1bf4e6bbd62b/Ut97u9ZtHs.json"
              style={{ width: "220px" }}
            ></dotlottie-player>
            <div className="w-full bg-[#161616] h-12 absolute bottom-0"></div>
          </div>
          <div className="text-center">
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Oops,Something went wrong.
            </h1>
            <p className="mt-4 text-base leading-7 text-[#d1d1d1]">
              Sorry, we couldn&apos;t find the page you&apos;re looking for.
            </p>
            <div className="mt-4 flex items-center justify-center gap-x-3">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="inline-flex items-center rounded-md border border-white px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:bg-[#1c1c1c] transition duration-300 ease-in-out"
              >
                <ArrowLeft size={16} className="mr-2" />
                Go back
              </button>
              {/* <button
                type="button"
                onClick={() => this.props.history.push("/user/feedback")}
                className="inline-flex items-center rounded-md border border-white px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:bg-[#1c1c1c] transition duration-300 ease-in-out"
              >
                <ArrowLeft size={16} className="mr-2" />
                Report bug
              </button> */}
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  children: PropTypes.node,
};

export default ErrorBoundary;

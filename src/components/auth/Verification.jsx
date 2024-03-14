import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Verification = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const [values, setValues] = useState(Array(4).fill(""));
  const inputs = Array.from({ length: 4 }).map(() => useRef());

  const otp = values.join("").toString();

  const handleChange = (i, e) => {
    const val = e.target.value;
    setValues(values.map((v, idx) => (idx === i ? val : v)));
    if (val && inputs[i + 1]) {
      inputs[i + 1].current.focus();
    }
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !values[i] && inputs[i - 1]) {
      inputs[i - 1].current.focus();
    }
  };

  const handleVerifyUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
      return;
    }
    const data = await fetch(`${apiUrl}/api/verification`, {
      method: "POST",
      headers: {
        "CONTENT-TYPE": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        verificationCode: otp,
      }),
    });

    const json = await data.json();

    if (json?.message === "user verified") {
      navigate("/register/topics-to-follow");
      // history.replace("/home");
    } else {
      setErrorMessage(json.message);
    }
  };

  return (
    <>
      <div className="min-h-[100vh] flex flex-col justify-center items-center ">
        <h1 className="text-white bg-[#202020] p-2 rounded-xl shadow-lg text-sm">
          Verify your mask account now
        </h1>
        <div className="bg-[#f4f4f4] text-[#1c1c1c] p-8 rounded shadow-md 2xs:w-[90%] xs:w-[90%] md:w-3/4 sm:w-2/3 2xl:w-[28%] lg:w-2/6  h-auto mt-10">
          <h2 className="text-3xl  font-semibold mb-4">Enter the OTP</h2>

          <div className="flex justify-between max-w-xs mx-auto">
            {inputs.map((input, i) => (
              <input
                key={i}
                ref={input}
                className="w-16 border rounded-lg mt-8 px-3 py-2 text-center focus:outline-none"
                type="text"
                maxLength="1"
                value={values[i]}
                onChange={(e) => handleChange(i, e)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                autoFocus={i === 0}
              />
            ))}
          </div>

          <div className="mt-12">
            <button
              onClick={handleVerifyUser}
              className="w-full mb-8 bg-zinc-800 text-white rounded py-2 px-4 hover:bg-zinc-900 transition duration-300"
            >
              Verify Code
            </button>
          </div>
          <p className="text-sm flex items-center justify-center w-full text-[#272727]">
            Check your email, you will recieve an OTP.
          </p>
          <div className="errormessage w-full flex justify-center mt-4 text-red-800">
            {errorMessage}
          </div>
        </div>
      </div>
    </>
  );
};

export default Verification;

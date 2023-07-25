import React, {useCallback, useEffect, useState} from 'react';

function App() {
  const [isButtonDisabled, setButtonDisabled] = useState(false)

  const [counter, setCounter] = useState(0)

  const fetchCounter = useCallback(async () => {
    const resp = await fetch(`/counter`);
    // convert data to json
    const json = await resp.json()

    // set state with the result
    setCounter(json?.val);
  }, [])

  // Fetch counter for the first time
  useEffect(() => {
    fetchCounter()
  }, [fetchCounter])

  const handleIncrementCounter = async () => {
    const requestOptions = {
      method: 'POST',
    };
    await fetch(`/counter`, requestOptions)
  }

  const handleClickIncrementCounter = async () => {
    setButtonDisabled(true);

    await handleIncrementCounter();

    await fetchCounter()

    setButtonDisabled(false);
  }

  return (
    <div>
      <div>
        <p> Counter value is: {counter}.</p>
      </div>
      <div>
        <p> Do you want to increment the counter?</p>
        <button disabled={isButtonDisabled} onClick={handleClickIncrementCounter}>Count</button>
      </div>
    </div>
  );
}

export default App;

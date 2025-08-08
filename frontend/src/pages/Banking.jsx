import React, { useState } from "react";

function BankApp() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleDeposit = () => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      setMessage("Please enter a positive number to deposit.");
      return;
    }
    setBalance(balance + amt);
    setMessage(`Deposited $${amt}. New balance: $${balance + amt}`);
    setAmount("");
  };

  const handleWithdraw = () => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      setMessage("Please enter a positive number to withdraw.");
      return;
    }
    if (amt > balance) {
      setMessage("Insufficient balance.");
      return;
    }
    setBalance(balance - amt);
    setMessage(`Withdrew $${amt}. New balance: $${balance - amt}`);
    setAmount("");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg font-sans">
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-700">Simple Bank Account</h2>

      <p className="text-center text-lg mb-6">
        <span className="font-semibold">Current Balance:</span>{" "}
        <span className="text-green-600">${balance.toFixed(2)}</span>
      </p>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <div className="flex justify-between">
        <button
          onClick={handleDeposit}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded shadow transition duration-300"
        >
          Deposit
        </button>
        <button
          onClick={handleWithdraw}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded shadow transition duration-300"
        >
          Withdraw
        </button>
      </div>

      {message && (
        <p
          className={`mt-6 text-center font-semibold ${
            message.includes("Deposited")
              ? "text-green-600"
              : message.includes("Withdrew")
              ? "text-yellow-600"
              : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default BankApp;

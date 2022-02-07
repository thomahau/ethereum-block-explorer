import { useRouter } from 'next/router';
import { useState } from 'react';

export default function AddressSearch() {
  const router = useRouter();
  const [addressQuery, setAddressQuery] = useState('');
  const [error, setError] = useState('');
  const regex = /^0x[a-fA-F0-9]{40}$/;

  const handleSubmit = event => {
    event.preventDefault();

    if (!regex.test(addressQuery)) {
      setError('Invalid address');
      return;
    }

    router.push(`/address/${addressQuery}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control mb-8 w-1/2">
        <label className="label" htmlFor="address-search">
          <span className="label-text">Search by Address</span>
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="0x..."
            className={`w-full pr-16 input input-bordered ${error ? 'input-error' : ''}`}
            id="address-search"
            value={addressQuery}
            onChange={e => setAddressQuery(e.target.value)}
          />
          <button className="absolute top-0 right-0 rounded-l-none btn btn-primary">Search</button>
        </div>
        {error && (
          <label className="label">
            <span className="label-text-alt text-error">{error}</span>
          </label>
        )}
      </div>
    </form>
  );
}

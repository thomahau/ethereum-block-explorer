import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getLatestBlocks } from '../lib/utils';
import FullPageSpinner from '../components/FullPageSpinner';
import AddressSearch from '../components/AddressSearch';

// TODO
// transaction lookup?
// network changer?
// determine gas price?

export default function LandingPage() {
  const [latestBlocks, setLatestBlocks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const latestBlocks = await getLatestBlocks();

    setLatestBlocks(latestBlocks);
    setLoading(false);
  };

  if (loading) return <FullPageSpinner />;

  return (
    <div>
      <div className="container mx-auto text-center mt-32">
        <h1 className="text-4xl mb-2 text-primary">The Other Ethereum Block Explorer</h1>
        <AddressSearch />
        <table className="min-w-full">
          <thead className="border-b border-t border-base-content uppercase text-sm">
            <tr>
              <th className="py-2 text-left">Block Height</th>
              <th className="py-2 text-left">Time</th>
              <th className="py-2 text-left">Transactions</th>
            </tr>
          </thead>
          <tbody>
            {latestBlocks?.map(block => (
              <tr key={block.hash} className="border-b border-base-content">
                <td className="py-2 text-left">
                  <Link href={`/block/${block.number}`}>
                    <a className="text-primary">{block.number}</a>
                  </Link>
                </td>
                <td className="py-2 text-left">{new Date(block.timestamp * 1000).toLocaleString()}</td>
                <td className="py-2 text-left">{block.txCount} txns</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

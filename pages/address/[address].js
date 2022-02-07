import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { providers, utils } from 'ethers';
import FullPageSpinner from '../../components/FullPageSpinner';

export default function Block() {
  const router = useRouter();
  const { address } = router.query;
  const [loading, setLoading] = useState(false);
  const [addressData, setAddressData] = useState({ balance: '', txCount: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const provider = new providers.JsonRpcProvider(process.env.NEXT_PUBLIC_NODE_URL);
    const balance = await provider.getBalance(address);
    const txCount = await provider.getTransactionCount(address);

    setAddressData({ balance: utils.commify(utils.formatEther(balance)), txCount: utils.commify(txCount) });
    setLoading(false);
  };

  if (loading) return <FullPageSpinner />;

  return (
    <div className="container mx-auto mt-32">
      <Link href="/">
        <a className="btn btn-sm btn-ghost pl-0 mb-4 text-primary">« Home</a>
      </Link>
      <h3 className="text-2xl mb-2 text-primary">Address {address}</h3>
      <div className="flex">
        <table className="min-w-full">
          <tbody className="">
            <tr className="border-b border-base-content">
              <td className="py-2 text-left">Balance:</td>
              <td className="py-2 text-left">{addressData.balance} Ether</td>
            </tr>
            <tr className="border-b border-base-content">
              <td className="py-2 text-left">Outgoing Transactions:</td>
              <td className="py-2 text-left">{addressData.txCount}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { providers, utils } from 'ethers';
import FullPageSpinner from '../../components/FullPageSpinner';
import { hexToString } from '../../lib/utils';

export default function Block() {
  const router = useRouter();
  const { blockNumber } = router.query;
  const [loading, setLoading] = useState(false);
  const [block, setBlock] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const provider = new providers.JsonRpcProvider(process.env.NEXT_PUBLIC_NODE_URL);
    const block = await provider.getBlock(+blockNumber);

    setBlock(block);
    setLoading(false);
  };

  if (loading) return <FullPageSpinner />;

  return Object.keys(block).length ? (
    <div className="container mx-auto mt-32">
      <Link href="/">
        <a className="btn btn-sm btn-ghost pl-0 mb-4 text-primary">« Home</a>
      </Link>
      <h3 className="text-2xl mb-2 text-primary">Block #{block.number}</h3>
      <div className="flex">
        <table className="min-w-full">
          <tbody className="">
            <tr className="border-b border-base-content">
              <td className="py-2 text-left">Block Height:</td>
              <td className="py-2 ptext-left">{block.number}</td>
            </tr>
            <tr className="border-b border-base-content">
              <td className="py-2 text-left">Timestamp:</td>
              <td className="py-2 text-left">{new Date(block.timestamp * 1000).toLocaleString()}</td>
            </tr>
            <tr className="border-b border-base-content">
              <td className="py-2 text-left">Transactions:</td>
              <td className="py-2 text-left">{block.transactions?.length}</td>
            </tr>
            <tr className="border-b border-base-content">
              <td className="py-2 text-left">Mined By:</td>

              <td className="py-2 text-left">
                <Link href={`/address/${block.miner}`}>
                  <a className="text-primary">{block.miner}</a>
                </Link>
              </td>
            </tr>
            {/* <tr className="border-b border-base-content">
              <td className="py-2 pl-2 text-left">Block reward:</td>
              <td className="py-2 pl-2 text-left">{}</td>
            </tr> */}
            <tr className="border-b border-base-content">
              <td className="py-2 text-left">Difficulty:</td>
              <td className="py-2 text-left">{utils.commify(utils.formatUnits(block._difficulty, 'wei'))}</td>
            </tr>
            <tr className="border-b border-base-content">
              <td className="py-2 text-left">Gas Used:</td>
              <td className="py-2 text-left">{utils.commify(utils.formatUnits(block.gasUsed, 'wei'))}</td>
            </tr>
            <tr className="border-b border-base-content">
              <td className="py-2 text-left">Gas Limit:</td>
              <td className="py-2 text-left">{utils.commify(utils.formatUnits(block.gasLimit, 'wei'))}</td>
            </tr>
            <tr className="border-b border-base-content">
              <td className="py-2 text-left">Extra Data:</td>
              <td className="py-2 text-left">
                {hexToString(block.extraData)} (Hex: {block.extraData})
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  ) : null;
}

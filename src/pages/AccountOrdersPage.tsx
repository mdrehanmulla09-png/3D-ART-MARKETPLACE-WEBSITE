import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Truck, Package, ShieldCheck, Printer, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AccountOrdersPage: React.FC = () => {
  const { orders, formatPrice } = useApp();

  return (
    <div className="min-h-screen bg-artora-ivory py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/account"
            className="flex items-center space-x-1.5 text-xs uppercase tracking-wider text-artora-muted hover:text-artora-nearblack transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Account Overview</span>
          </Link>
          <span className="text-xs text-artora-muted">Verified Order Receipts</span>
        </div>

        <div className="border-b border-artora-warmgrey/60 pb-6 mb-8">
          <span className="text-[10px] uppercase tracking-[0.25em] text-artora-cobalt font-semibold">
            Collection Ledger
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-artora-nearblack mt-1">
            My Art Orders & Authenticity Certificates
          </h1>
          <p className="text-xs text-artora-muted mt-1 font-light">
            Each entry represents an escrow-protected fine art acquisition accompanied by physical artist provenance documentation.
          </p>
        </div>

        {/* Orders list */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-artora-warmgrey shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-artora-warmgrey gap-4">
                <div>
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-sm font-bold text-artora-nearblack">
                      {order.orderNumber}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      order.orderStatus === 'delivered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {order.orderStatus.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-artora-muted mt-1">
                    Ordered on {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="font-semibold text-lg text-artora-nearblack block">
                    {formatPrice(order.total)}
                  </span>
                  <span className="text-[11px] text-emerald-700">Settled via Razorpay Escrow</span>
                </div>
              </div>

              {/* Items */}
              <div className="py-6 border-b border-artora-warmgrey space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-16 h-16 rounded-lg object-cover border border-artora-warmgrey"
                      />
                      <div>
                        <Link to={`/artwork/${item.artworkId}`} className="font-medium text-sm text-artora-nearblack hover:text-artora-cobalt">
                          {item.title}
                        </Link>
                        <p className="text-artora-muted text-[11px] mt-0.5">
                          Artist: {item.artistName} · Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold text-artora-nearblack">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Carrier */}
              <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                <div className="flex items-center space-x-2 text-artora-muted">
                  <Truck className="w-4 h-4 text-artora-cobalt" />
                  <span>
                    Carrier: <strong className="text-artora-nearblack">{order.carrier || 'BlueDart Art Logistics'}</strong>
                    {order.trackingNumber && <> · Tracking: <strong className="text-artora-nearblack font-mono">{order.trackingNumber}</strong></>}
                  </span>
                </div>

                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 border border-artora-warmgrey hover:bg-artora-ivory text-artora-nearblack rounded text-[11px] font-semibold uppercase tracking-wider flex items-center space-x-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Certificate</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Truck, 
  Package, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  ShieldCheck,
  Edit2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';

export const ArtistOrdersPage: React.FC = () => {
  const { orders, formatPrice, updateOrderStatus } = useApp();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [trackingInput, setTrackingInput] = useState('');
  const [newStatus, setNewStatus] = useState<Order['orderStatus']>('in_preparation');

  const handleUpdateStatus = (orderId: string) => {
    updateOrderStatus(orderId, newStatus, trackingInput);
    setSelectedOrder(null);
  };

  return (
    <div className="min-h-screen bg-artora-ivory py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/dashboard"
            className="flex items-center space-x-1.5 text-xs uppercase tracking-wider text-artora-muted hover:text-artora-nearblack transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Studio Dashboard</span>
          </Link>
          <span className="text-xs text-artora-muted">Order Fulfillment & Courier Dispatch</span>
        </div>

        {/* Header */}
        <div className="border-b border-artora-warmgrey/60 pb-6 mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl text-artora-nearblack">
            Studio Order Fulfillments
          </h1>
          <p className="text-xs text-artora-muted mt-1 font-light">
            Coordinate museum packaging, update courier dispatch tracking, and monitor collector receipt.
          </p>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl border border-artora-warmgrey shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-artora-ivory/60 border-b border-artora-warmgrey text-artora-muted uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4 pl-6">Order ID & Date</th>
                  <th className="p-4">Collector Details</th>
                  <th className="p-4">Artworks Ordered</th>
                  <th className="p-4">Total Amount</th>
                  <th className="p-4">Fulfillment Status</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-artora-warmgrey/50">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-artora-ivory/30 transition-colors">
                    <td className="p-4 pl-6">
                      <span className="font-mono font-bold text-artora-nearblack block">
                        {order.orderNumber}
                      </span>
                      <span className="text-[11px] text-artora-muted">
                        {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className="font-semibold text-artora-nearblack block">{order.shippingAddress.fullName}</span>
                      <span className="text-[11px] text-artora-muted truncate block max-w-xs">
                        {order.shippingAddress.city}, {order.shippingAddress.country}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="space-y-1">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center space-x-2">
                            <span className="text-artora-nearblack font-medium">{item.title}</span>
                            <span className="text-artora-muted text-[11px]">× {item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </td>

                    <td className="p-4 font-semibold text-artora-nearblack">
                      {formatPrice(order.total)}
                      <span className="text-[10px] text-emerald-700 block font-normal">Paid via Escrow</span>
                    </td>

                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 ${
                        order.orderStatus === 'delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.orderStatus === 'shipped'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}>
                        {order.orderStatus === 'shipped' && <Truck className="w-3 h-3" />}
                        {order.orderStatus.replace('_', ' ')}
                      </span>
                      {order.trackingNumber && (
                        <span className="text-[10px] font-mono text-artora-muted block mt-1">
                          {order.trackingNumber}
                        </span>
                      )}
                    </td>

                    <td className="p-4 pr-6 text-right">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setNewStatus(order.orderStatus);
                          setTrackingInput(order.trackingNumber || '');
                        }}
                        className="px-3 py-1.5 bg-artora-ivory hover:bg-artora-nearblack hover:text-white border border-artora-warmgrey rounded text-[11px] font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Update Status</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Update Tracking Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-artora-warmgrey">
            <h3 className="font-serif text-xl text-artora-nearblack">
              Update Order {selectedOrder.orderNumber}
            </h3>
            <p className="text-xs text-artora-muted mt-1">
              Collector: {selectedOrder.shippingAddress.fullName}
            </p>

            <div className="mt-5 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-artora-nearblack mb-1">Order Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as Order['orderStatus'])}
                  className="w-full p-2.5 border border-artora-warmgrey rounded focus:border-artora-cobalt focus:outline-none"
                >
                  <option value="confirmed">Confirmed (Studio Notified)</option>
                  <option value="in_preparation">In Preparation (Custom Crating)</option>
                  <option value="shipped">Shipped (Dispatched to Courier)</option>
                  <option value="delivered">Delivered to Sanctuary</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-artora-nearblack mb-1">Tracking Number / AWB</label>
                <input
                  type="text"
                  placeholder="e.g. BLUEDART-992104812"
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  className="w-full p-2.5 border border-artora-warmgrey rounded focus:border-artora-cobalt focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 text-xs text-artora-muted hover:text-artora-nearblack"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleUpdateStatus(selectedOrder.id)}
                className="px-5 py-2.5 bg-artora-nearblack hover:bg-artora-cobalt text-white text-xs uppercase tracking-wider font-semibold rounded"
              >
                Save Updates
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

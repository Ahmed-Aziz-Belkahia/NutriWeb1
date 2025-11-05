import { useState, useEffect } from 'react';
import { Users, Download, Trash2, RefreshCw, CheckCircle, XCircle, Clock, Mail } from 'lucide-react';

interface BetaTester {
  id: number;
  email: string;
  platform: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  reviewedAt?: string | null;
  reviewedBy?: string | null;
  inviteEmailSent?: boolean;
  rejectionReason?: string | null;
}

interface AdminSettings {
  notificationEmails: string[];
}

export default function BetaAdmin() {
  const [testers, setTesters] = useState<BetaTester[]>([]);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [rejectionReason, setRejectionReason] = useState('');
  const [rejectingId, setRejectingId] = useState<number | null>(null);
  const [adminSettings, setAdminSettings] = useState<AdminSettings>({ notificationEmails: [] });
  const [showSettings, setShowSettings] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState('');

  // Simple password protection (change this!)
  const ADMIN_PASSWORD = 'nutriai2025';

  useEffect(() => {
    if (isAuthenticated) {
      loadTesters();
      loadAdminSettings();
    }
  }, [isAuthenticated]);

  const loadTesters = async () => {
    try {
      const apiUrl = '/api/beta-testers';
      
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        setTesters(data);
      }
    } catch (error) {
      console.error('Error loading testers:', error);
    }
  };

  const loadAdminSettings = async () => {
    try {
      const response = await fetch('/api/admin-settings');
      if (response.ok) {
        const data = await response.json();
        setAdminSettings(data);
      }
    } catch (error) {
      console.error('Error loading admin settings:', error);
    }
  };

  const addAdminEmail = async () => {
    if (!newAdminEmail) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newAdminEmail)) {
      alert('Please enter a valid email address');
      return;
    }

    if (adminSettings.notificationEmails.includes(newAdminEmail)) {
      alert('This email is already in the notification list');
      return;
    }

    const updatedEmails = [...adminSettings.notificationEmails, newAdminEmail];
    await updateNotificationEmails(updatedEmails);
    setNewAdminEmail('');
  };

  const removeAdminEmail = async (email: string) => {
    const updatedEmails = adminSettings.notificationEmails.filter(e => e !== email);
    await updateNotificationEmails(updatedEmails);
  };

  const updateNotificationEmails = async (emails: string[]) => {
    try {
      const response = await fetch('/api/admin-settings/notification-emails', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emails }),
      });

      if (response.ok) {
        const data = await response.json();
        setAdminSettings({ notificationEmails: data.notificationEmails });
        alert('✅ Admin notification settings updated!');
      } else {
        const data = await response.json();
        alert(`Failed to update: ${data.error}`);
      }
    } catch (error) {
      console.error('Error updating admin settings:', error);
      alert('Failed to update admin settings');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const exportToCSV = () => {
    const csv = [
      ['Email', 'Platform', 'Status', 'Created At'],
      ...testers.map(t => [
        t.email,
        t.platform,
        t.status,
        new Date(t.createdAt).toLocaleString()
      ])
    ].map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nutriai-beta-testers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const exportToJSON = () => {
    const json = JSON.stringify(testers, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nutriai-beta-testers-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const clearAllData = async () => {
    if (window.confirm('Are you sure you want to delete ALL beta tester data? This cannot be undone!')) {
      try {
        const apiUrl = '/api/beta-testers';
        
        const response = await fetch(apiUrl, {
          method: 'DELETE',
        });
        if (response.ok) {
          setTesters([]);
        }
      } catch (error) {
        console.error('Error clearing data:', error);
        alert('Failed to clear data');
      }
    }
  };

  const deleteTester = async (id: number) => {
    if (window.confirm('Delete this beta tester?')) {
      try {
        const apiUrl = `/api/beta-testers/${id}`;
        
        const response = await fetch(apiUrl, {
          method: 'DELETE',
        });
        if (response.ok) {
          setTesters(testers.filter(t => t.id !== id));
        }
      } catch (error) {
        console.error('Error deleting tester:', error);
        alert('Failed to delete tester');
      }
    }
  };

  const approveTester = async (id: number) => {
    try {
      const apiUrl = `/api/beta-testers/${id}/approve`;
      
      const response = await fetch(apiUrl, {
        method: 'PATCH',
      });
      
      if (response.ok) {
        await loadTesters();
        alert('✅ Application approved! Invitation email sent.');
      } else {
        const data = await response.json();
        alert(`Failed to approve: ${data.error}`);
      }
    } catch (error) {
      console.error('Error approving tester:', error);
      alert('Failed to approve tester');
    }
  };

  const rejectTester = async (id: number, reason: string) => {
    try {
      const apiUrl = `/api/beta-testers/${id}/reject`;
      
      const response = await fetch(apiUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason }),
      });
      
      if (response.ok) {
        await loadTesters();
        setRejectingId(null);
        setRejectionReason('');
        alert('❌ Application rejected. Notification email sent.');
      } else {
        const data = await response.json();
        alert(`Failed to reject: ${data.error}`);
      }
    } catch (error) {
      console.error('Error rejecting tester:', error);
      alert('Failed to reject tester');
    }
  };

  const bulkApprove = async () => {
    if (selectedIds.length === 0) {
      alert('No applications selected');
      return;
    }

    if (!window.confirm(`Approve ${selectedIds.length} application(s)?`)) {
      return;
    }

    try {
      const apiUrl = '/api/beta-testers/bulk-approve';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: selectedIds }),
      });
      
      if (response.ok) {
        const data = await response.json();
        await loadTesters();
        setSelectedIds([]);
        alert(`✅ ${data.results.approved.length} applications approved!`);
      } else {
        alert('Failed to bulk approve');
      }
    } catch (error) {
      console.error('Error bulk approving:', error);
      alert('Failed to bulk approve');
    }
  };

  const toggleSelection = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const pendingTesters = filteredTesters.filter(t => t.status === 'pending');
    if (selectedIds.length === pendingTesters.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(pendingTesters.map(t => t.id));
    }
  };

  const filteredTesters = filter === 'all' 
    ? testers 
    : testers.filter(t => t.status === filter);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
          <Clock className="w-3 h-3" />
          Pending
        </span>;
      case 'approved':
        return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
          <CheckCircle className="w-3 h-3" />
          Approved
        </span>;
      case 'rejected':
        return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
          <XCircle className="w-3 h-3" />
          Rejected
        </span>;
      default:
        return <span className="text-xs text-gray-400">{status}</span>;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-nutri-bg flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-nutri-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Beta Admin Panel</h1>
            <p className="text-gray-600 mt-2">Enter password to access</p>
          </div>

          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-nutri-blue-500 focus:outline-none mb-4"
              required
            />
            <button
              type="submit"
              className="w-full px-6 py-3 bg-nutri-blue-500 text-white rounded-full font-semibold hover:bg-nutri-blue-600 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nutri-bg py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Beta Testers Dashboard</h1>
              <p className="text-gray-600">
                Total signups: <span className="font-semibold text-nutri-blue-500">{testers.length}</span>
              </p>
            </div>
            <button
              onClick={loadTesters}
              className="p-3 bg-nutri-blue-50 text-nutri-blue-600 rounded-2xl hover:bg-nutri-blue-100 transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-yellow-50 rounded-2xl p-4">
              <div className="text-sm text-yellow-600 font-medium mb-1">⏳ Pending Review</div>
              <div className="text-2xl font-bold text-yellow-700">
                {testers.filter(t => t.status === 'pending').length}
              </div>
            </div>
            <div className="bg-green-50 rounded-2xl p-4">
              <div className="text-sm text-green-600 font-medium mb-1">✅ Approved</div>
              <div className="text-2xl font-bold text-green-700">
                {testers.filter(t => t.status === 'approved').length}
              </div>
            </div>
            <div className="bg-red-50 rounded-2xl p-4">
              <div className="text-sm text-red-600 font-medium mb-1">❌ Rejected</div>
              <div className="text-2xl font-bold text-red-700">
                {testers.filter(t => t.status === 'rejected').length}
              </div>
            </div>
            <div className="bg-nutri-blue-50 rounded-2xl p-4">
              <div className="text-sm text-nutri-blue-600 font-medium mb-1">📱 Android</div>
              <div className="text-2xl font-bold text-nutri-blue-700">
                {testers.filter(t => t.platform === 'android').length}
              </div>
            </div>
          </div>

          {/* Admin Notification Settings */}
          <div className="mb-8 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-orange-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Admin Email Notifications</h3>
                  <p className="text-sm text-gray-600">
                    Get notified when users apply for beta access
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="px-4 py-2 bg-white text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition-colors border-2 border-orange-200"
              >
                {showSettings ? 'Hide' : 'Manage'}
              </button>
            </div>

            {showSettings && (
              <div className="mt-4 space-y-3">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addAdminEmail()}
                    placeholder="admin@example.com"
                    className="flex-1 px-4 py-2 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:outline-none bg-white"
                  />
                  <button
                    onClick={addAdminEmail}
                    className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors"
                  >
                    Add
                  </button>
                </div>

                {adminSettings.notificationEmails.length === 0 ? (
                  <div className="text-center py-4 text-gray-500 bg-white rounded-xl">
                    No admin emails configured. Add one to start receiving notifications.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {adminSettings.notificationEmails.map((email) => (
                      <div
                        key={email}
                        className="flex items-center justify-between bg-white px-4 py-3 rounded-xl"
                      >
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-orange-500" />
                          <span className="font-medium text-gray-900">{email}</span>
                        </div>
                        <button
                          onClick={() => removeAdminEmail(email)}
                          className="text-red-500 hover:text-red-600 transition-colors"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 mb-6 border-b border-gray-200">
            {['all', 'pending', 'approved', 'rejected'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab as typeof filter)}
                className={`px-4 py-2 font-semibold capitalize transition-colors relative ${
                  filter === tab
                    ? 'text-nutri-blue-600 border-b-2 border-nutri-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
                {tab !== 'all' && (
                  <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                    {testers.filter(t => t.status === tab).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex gap-3 mb-6 flex-wrap">
            {selectedIds.length > 0 && (
              <div className="flex items-center gap-3 bg-nutri-blue-50 px-4 py-2 rounded-2xl">
                <span className="text-sm font-semibold text-nutri-blue-700">
                  {selectedIds.length} selected
                </span>
                <button
                  onClick={bulkApprove}
                  className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-xl text-sm font-semibold hover:bg-green-600 transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve All
                </button>
                <button
                  onClick={() => setSelectedIds([])}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Clear
                </button>
              </div>
            )}
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-2xl font-semibold hover:bg-green-600 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button
              onClick={exportToJSON}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-2xl font-semibold hover:bg-blue-600 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export JSON
            </button>
            <button
              onClick={clearAllData}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-2xl font-semibold hover:bg-red-600 transition-colors ml-auto"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  {filter === 'pending' && (
                    <th className="w-12 py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.length === filteredTesters.filter(t => t.status === 'pending').length && filteredTesters.filter(t => t.status === 'pending').length > 0}
                        onChange={toggleSelectAll}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                    </th>
                  )}
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Platform</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Email Sent</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Applied</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTesters.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-500">
                      No applications {filter !== 'all' && `with status: ${filter}`}
                    </td>
                  </tr>
                ) : (
                  filteredTesters.map((tester) => (
                    <tr key={tester.id} className="border-b border-gray-100 hover:bg-gray-50">
                      {filter === 'pending' && (
                        <td className="py-3 px-4">
                          {tester.status === 'pending' && (
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(tester.id)}
                              onChange={() => toggleSelection(tester.id)}
                              className="w-4 h-4 rounded border-gray-300"
                            />
                          )}
                        </td>
                      )}
                      <td className="py-3 px-4 text-gray-900">{tester.email}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-nutri-blue-100 text-nutri-blue-700`}>
                          📱 {tester.platform}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {getStatusBadge(tester.status)}
                      </td>
                      <td className="py-3 px-4">
                        {tester.inviteEmailSent ? (
                          <span className="inline-flex items-center gap-1 text-xs text-green-600">
                            <Mail className="w-3 h-3" />
                            Sent
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">-</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(tester.createdAt).toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          {tester.status === 'pending' && (
                            <>
                              <button
                                onClick={() => approveTester(tester.id)}
                                className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-lg text-xs font-semibold hover:bg-green-600 transition-colors"
                                title="Approve"
                              >
                                <CheckCircle className="w-3 h-3" />
                                Approve
                              </button>
                              <button
                                onClick={() => setRejectingId(tester.id)}
                                className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-lg text-xs font-semibold hover:bg-red-600 transition-colors"
                                title="Reject"
                              >
                                <XCircle className="w-3 h-3" />
                                Reject
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => deleteTester(tester.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {rejectingId && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Reject Application</h3>
                <p className="text-gray-600 mb-4">
                  Provide an optional reason for rejection (will be included in email):
                </p>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="e.g., Beta program is full, or leave blank for generic message"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-nutri-blue-500 focus:outline-none mb-4"
                  rows={3}
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setRejectingId(null);
                      setRejectionReason('');
                    }}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => rejectTester(rejectingId, rejectionReason)}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-2xl font-semibold hover:bg-red-600 transition-colors"
                  >
                    Confirm Rejection
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faDownload, 
  faTrash, 
  faSync, 
  faCheckCircle, 
  faTimesCircle, 
  faClock, 
  faEnvelope,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

export default function BetaAdmin() {
  const [testers, setTesters] = useState([]);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if already authenticated in this session
    return sessionStorage.getItem('nutriai_admin_auth') === 'true';
  });
  const [filter, setFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState([]);
  const [rejectionReason, setRejectionReason] = useState('');
  const [rejectingId, setRejectingId] = useState(null);
  const [adminSettings, setAdminSettings] = useState({ notificationEmails: [] });
  const [showSettings, setShowSettings] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [settingsLoading, setSettingsLoading] = useState(false);

  // Simple password protection
  const ADMIN_PASSWORD = 'nutriai2025';

  const loadTesters = useCallback(async () => {
    try {
      const response = await fetch('/api/beta-testers');
      if (response.ok) {
        const data = await response.json();
        setTesters(data);
      }
    } catch (error) {
      console.error('Error loading testers:', error);
    }
  }, []);

  const loadAdminSettings = useCallback(async () => {
    console.log('[FRONTEND] loadAdminSettings called');
    setSettingsLoading(true);
    try {
      // Add cache-busting query parameter
      const url = `/api/admin-settings?_t=${Date.now()}`;
      console.log('[FRONTEND] Fetching:', url);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      console.log('[FRONTEND] Response status:', response.status);
      console.log('[FRONTEND] Response ok:', response.ok);
      if (response.ok) {
        const data = await response.json();
        console.log('[FRONTEND] Raw response data:', JSON.stringify(data));
        console.log('[FRONTEND] notificationEmails:', data?.notificationEmails);
        console.log('[FRONTEND] notificationEmails length:', data?.notificationEmails?.length);
        if (data && data.notificationEmails) {
          console.log('[FRONTEND] Setting adminSettings state with:', data.notificationEmails);
          setAdminSettings({ notificationEmails: data.notificationEmails });
        } else {
          console.log('[FRONTEND] No notificationEmails in response data');
        }
      } else {
        console.error('[FRONTEND] Failed to load admin settings:', response.status);
        const errorText = await response.text();
        console.error('[FRONTEND] Error response:', errorText);
      }
    } catch (error) {
      console.error('[FRONTEND] Error loading admin settings:', error);
    } finally {
      setSettingsLoading(false);
      console.log('[FRONTEND] loadAdminSettings completed');
    }
  }, []);

  useEffect(() => {
    console.log('[FRONTEND] useEffect triggered, isAuthenticated:', isAuthenticated);
    if (isAuthenticated) {
      console.log('[FRONTEND] User is authenticated, loading data...');
      loadTesters();
      loadAdminSettings();
    }
  }, [isAuthenticated, loadTesters, loadAdminSettings]);

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

  const removeAdminEmail = async (email) => {
    const updatedEmails = adminSettings.notificationEmails.filter(e => e !== email);
    await updateNotificationEmails(updatedEmails);
  };

  const updateNotificationEmails = async (emails) => {
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
        setAdminSettings(prev => ({ ...prev, notificationEmails: data.notificationEmails }));
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

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('nutriai_admin_auth', 'true');
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('nutriai_admin_auth');
    setIsAuthenticated(false);
    setPassword('');
  };

  const exportToCSV = () => {
    const csv = [
      ['Email', 'Platform', 'Status', 'Applied At', 'Approved At'],
      ...testers.map(t => [
        t.email,
        t.platform,
        t.status,
        new Date(t.submittedAt || t.createdAt).toLocaleString(),
        t.approvedAt ? new Date(t.approvedAt).toLocaleString() : '-'
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
        const response = await fetch('/api/beta-testers', {
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

  const deleteTester = async (id) => {
    if (window.confirm('Delete this beta tester?')) {
      try {
        const response = await fetch(`/api/beta-testers/${id}`, {
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

  const approveTester = async (id) => {
    try {
      const tester = testers.find(t => t.id === id);
      const endpoint = tester?.platform === 'android' 
        ? `/api/beta-android-approve/${id}`
        : `/api/beta-testers/${id}/approve`;

      const response = await fetch(endpoint, {
        method: tester?.platform === 'android' ? 'POST' : 'PATCH',
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

  const rejectTester = async (id, reason) => {
    try {
      const tester = testers.find(t => t.id === id);
      const endpoint = tester?.platform === 'android'
        ? `/api/beta-android-reject/${id}`
        : `/api/beta-testers/${id}/reject`;

      const response = await fetch(endpoint, {
        method: tester?.platform === 'android' ? 'POST' : 'PATCH',
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
      const response = await fetch('/api/beta-testers/bulk-approve', {
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

  const toggleSelection = (id) => {
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

  const getStatusBadge = (status) => {
    const styles = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.25rem',
      padding: '0.25rem 0.75rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: 600,
    };

    switch (status) {
      case 'pending':
        return (
          <span style={{ ...styles, backgroundColor: '#fef3c7', color: '#92400e' }}>
            <FontAwesomeIcon icon={faClock} style={{ width: '0.75rem', height: '0.75rem' }} />
            Pending
          </span>
        );
      case 'approved':
        return (
          <span style={{ ...styles, backgroundColor: '#d1fae5', color: '#065f46' }}>
            <FontAwesomeIcon icon={faCheckCircle} style={{ width: '0.75rem', height: '0.75rem' }} />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span style={{ ...styles, backgroundColor: '#fee2e2', color: '#991b1b' }}>
            <FontAwesomeIcon icon={faTimesCircle} style={{ width: '0.75rem', height: '0.75rem' }} />
            Rejected
          </span>
        );
      default:
        return <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{status}</span>;
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#f9fafb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}>
        <div style={{
          maxWidth: '28rem',
          width: '100%',
          background: 'white',
          borderRadius: '1.5rem',
          padding: '2rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '4rem',
              height: '4rem',
              background: '#0ea5e9',
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto',
            }}>
              <FontAwesomeIcon icon={faUsers} style={{ width: '2rem', height: '2rem', color: 'white' }} />
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>Beta Admin Panel</h1>
            <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>Enter password to access</p>
          </div>

          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              required
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '1rem',
                marginBottom: '1rem',
                outline: 'none',
              }}
              onFocus={(e) => e.target.style.borderColor = '#0ea5e9'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.75rem 1.5rem',
                background: '#0ea5e9',
                color: 'white',
                borderRadius: '9999px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.background = '#0284c7'}
              onMouseLeave={(e) => e.target.style.background = '#0ea5e9'}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f9fafb',
      padding: '5rem 1rem',
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{
          background: 'white',
          borderRadius: '1.5rem',
          padding: '2rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '2rem',
          }}>
            <div>
              <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
                Beta Testers Dashboard
              </h1>
              <p style={{ color: '#6b7280' }}>
                Total signups: <span style={{ fontWeight: 600, color: '#0ea5e9' }}>{testers.length}</span>
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={loadTesters}
                title="Refresh"
                style={{
                  padding: '0.75rem',
                  background: '#eff6ff',
                  color: '#0ea5e9',
                  borderRadius: '1rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => e.target.style.background = '#dbeafe'}
                onMouseLeave={(e) => e.target.style.background = '#eff6ff'}
              >
                <FontAwesomeIcon icon={faSync} style={{ width: '1.25rem', height: '1.25rem' }} />
              </button>
              <button
                onClick={handleLogout}
                title="Logout"
                style={{
                  padding: '0.75rem 1rem',
                  background: '#fef2f2',
                  color: '#ef4444',
                  borderRadius: '1rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: 500,
                }}
                onMouseEnter={(e) => e.target.style.background = '#fee2e2'}
                onMouseLeave={(e) => e.target.style.background = '#fef2f2'}
              >
                <FontAwesomeIcon icon={faSignOutAlt} style={{ width: '1rem', height: '1rem' }} />
                Logout
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem',
          }}>
            <div style={{ background: '#fef3c7', borderRadius: '1rem', padding: '1rem' }}>
              <div style={{ fontSize: '0.875rem', color: '#92400e', fontWeight: 500, marginBottom: '0.25rem' }}>
                ⏳ Pending Review
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#78350f' }}>
                {testers.filter(t => t.status === 'pending').length}
              </div>
            </div>
            <div style={{ background: '#d1fae5', borderRadius: '1rem', padding: '1rem' }}>
              <div style={{ fontSize: '0.875rem', color: '#065f46', fontWeight: 500, marginBottom: '0.25rem' }}>
                ✅ Approved
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#047857' }}>
                {testers.filter(t => t.status === 'approved').length}
              </div>
            </div>
            <div style={{ background: '#fee2e2', borderRadius: '1rem', padding: '1rem' }}>
              <div style={{ fontSize: '0.875rem', color: '#991b1b', fontWeight: 500, marginBottom: '0.25rem' }}>
                ❌ Rejected
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#dc2626' }}>
                {testers.filter(t => t.status === 'rejected').length}
              </div>
            </div>
            <div style={{ background: '#eff6ff', borderRadius: '1rem', padding: '1rem' }}>
              <div style={{ fontSize: '0.875rem', color: '#1e40af', fontWeight: 500, marginBottom: '0.25rem' }}>
                📱 Android
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1d4ed8' }}>
                {testers.filter(t => t.platform === 'android').length}
              </div>
            </div>
          </div>

          {/* Admin Notification Settings */}
          <div style={{
            marginBottom: '2rem',
            background: 'linear-gradient(to bottom right, #fff7ed, #fef3c7)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '2px solid #fed7aa',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  background: '#f97316',
                  borderRadius: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <FontAwesomeIcon icon={faEnvelope} style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
                </div>
                <div>
                  <h3 style={{ fontWeight: 'bold', color: '#111827', marginBottom: '0.25rem' }}>
                    Admin Email Notifications
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: 0 }}>
                    Get notified when users apply for beta access
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSettings(!showSettings)}
                style={{
                  padding: '0.5rem 1rem',
                  background: 'white',
                  color: '#ea580c',
                  fontWeight: 600,
                  borderRadius: '0.75rem',
                  border: '2px solid #fed7aa',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => e.target.style.background = '#fff7ed'}
                onMouseLeave={(e) => e.target.style.background = 'white'}
              >
                {showSettings ? 'Hide' : 'Manage'}
              </button>
            </div>

            {showSettings && (
              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="email"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addAdminEmail()}
                    placeholder="admin@example.com"
                    style={{
                      flex: 1,
                      padding: '0.5rem 1rem',
                      border: '2px solid #fed7aa',
                      borderRadius: '0.75rem',
                      background: 'white',
                      outline: 'none',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#fb923c'}
                    onBlur={(e) => e.target.style.borderColor = '#fed7aa'}
                  />
                  <button
                    onClick={addAdminEmail}
                    style={{
                      padding: '0.5rem 1.5rem',
                      background: '#f97316',
                      color: 'white',
                      fontWeight: 600,
                      borderRadius: '0.75rem',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#ea580c'}
                    onMouseLeave={(e) => e.target.style.background = '#f97316'}
                  >
                    Add
                  </button>
                  <button
                    onClick={loadAdminSettings}
                    disabled={settingsLoading}
                    style={{
                      padding: '0.5rem 1rem',
                      background: 'white',
                      color: '#f97316',
                      fontWeight: 600,
                      borderRadius: '0.75rem',
                      border: '2px solid #fed7aa',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#fff7ed'}
                    onMouseLeave={(e) => e.target.style.background = 'white'}
                  >
                    <FontAwesomeIcon icon={faSync} spin={settingsLoading} />
                  </button>
                </div>

                {settingsLoading ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '1rem',
                    color: '#6b7280',
                    background: 'white',
                    borderRadius: '0.75rem',
                  }}>
                    Loading...
                  </div>
                ) : adminSettings.notificationEmails.length === 0 ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '1rem',
                    color: '#6b7280',
                    background: 'white',
                    borderRadius: '0.75rem',
                  }}>
                    No admin emails configured. Add one to start receiving notifications.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {adminSettings.notificationEmails.map((email) => (
                      <div
                        key={email}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          background: 'white',
                          padding: '0.75rem 1rem',
                          borderRadius: '0.75rem',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <FontAwesomeIcon icon={faEnvelope} style={{ width: '1rem', height: '1rem', color: '#f97316' }} />
                          <span style={{ fontWeight: 500, color: '#111827' }}>{email}</span>
                        </div>
                        <button
                          onClick={() => removeAdminEmail(email)}
                          style={{
                            color: '#ef4444',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'color 0.2s',
                          }}
                          onMouseEnter={(e) => e.target.style.color = '#dc2626'}
                          onMouseLeave={(e) => e.target.style.color = '#ef4444'}
                        >
                          <FontAwesomeIcon icon={faTimesCircle} style={{ width: '1.25rem', height: '1.25rem' }} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Filter Tabs */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.5rem',
            borderBottom: '1px solid #e5e7eb',
          }}>
            {['all', 'pending', 'approved', 'rejected'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                style={{
                  padding: '0.5rem 1rem',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  color: filter === tab ? '#0ea5e9' : '#6b7280',
                  background: 'none',
                  border: 'none',
                  borderBottom: filter === tab ? '2px solid #0ea5e9' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (filter !== tab) e.target.style.color = '#374151';
                }}
                onMouseLeave={(e) => {
                  if (filter !== tab) e.target.style.color = '#6b7280';
                }}
              >
                {tab}
                {tab !== 'all' && (
                  <span style={{
                    marginLeft: '0.5rem',
                    fontSize: '0.75rem',
                    background: '#f3f4f6',
                    padding: '0.125rem 0.5rem',
                    borderRadius: '9999px',
                  }}>
                    {testers.filter(t => t.status === tab).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
          }}>
            {selectedIds.length > 0 && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: '#eff6ff',
                padding: '0.5rem 1rem',
                borderRadius: '1rem',
              }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e40af' }}>
                  {selectedIds.length} selected
                </span>
                <button
                  onClick={bulkApprove}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.25rem 0.75rem',
                    background: '#22c55e',
                    color: 'white',
                    borderRadius: '0.75rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#16a34a'}
                  onMouseLeave={(e) => e.target.style.background = '#22c55e'}
                >
                  <FontAwesomeIcon icon={faCheckCircle} style={{ width: '1rem', height: '1rem' }} />
                  Approve All
                </button>
                <button
                  onClick={() => setSelectedIds([])}
                  style={{
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#111827'}
                  onMouseLeave={(e) => e.target.style.color = '#6b7280'}
                >
                  Clear
                </button>
              </div>
            )}
            <button
              onClick={exportToCSV}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                background: '#22c55e',
                color: 'white',
                borderRadius: '1rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.background = '#16a34a'}
              onMouseLeave={(e) => e.target.style.background = '#22c55e'}
            >
              <FontAwesomeIcon icon={faDownload} style={{ width: '1rem', height: '1rem' }} />
              Export CSV
            </button>
            <button
              onClick={exportToJSON}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                background: '#3b82f6',
                color: 'white',
                borderRadius: '1rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.background = '#2563eb'}
              onMouseLeave={(e) => e.target.style.background = '#3b82f6'}
            >
              <FontAwesomeIcon icon={faDownload} style={{ width: '1rem', height: '1rem' }} />
              Export JSON
            </button>
            <button
              onClick={clearAllData}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                background: '#ef4444',
                color: 'white',
                borderRadius: '1rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                marginLeft: 'auto',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.background = '#dc2626'}
              onMouseLeave={(e) => e.target.style.background = '#ef4444'}
            >
              <FontAwesomeIcon icon={faTrash} style={{ width: '1rem', height: '1rem' }} />
              Clear All
            </button>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                  {filter === 'pending' && (
                    <th style={{ padding: '0.75rem 1rem', width: '3rem' }}>
                      <input
                        type="checkbox"
                        checked={selectedIds.length === filteredTesters.filter(t => t.status === 'pending').length && filteredTesters.filter(t => t.status === 'pending').length > 0}
                        onChange={toggleSelectAll}
                        style={{ width: '1rem', height: '1rem', borderRadius: '0.25rem' }}
                      />
                    </th>
                  )}
                  <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontWeight: 600, color: '#374151' }}>Email</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontWeight: 600, color: '#374151' }}>Platform</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontWeight: 600, color: '#374151' }}>Status</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontWeight: 600, color: '#374151' }}>Email Sent</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontWeight: 600, color: '#374151' }}>Date</th>
                  <th style={{ textAlign: 'right', padding: '0.75rem 1rem', fontWeight: 600, color: '#374151' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTesters.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                      No applications {filter !== 'all' && `with status: ${filter}`}
                    </td>
                  </tr>
                ) : (
                  filteredTesters.map((tester) => (
                    <tr key={tester.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      {filter === 'pending' && (
                        <td style={{ padding: '0.75rem 1rem' }}>
                          {tester.status === 'pending' && (
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(tester.id)}
                              onChange={() => toggleSelection(tester.id)}
                              style={{ width: '1rem', height: '1rem', borderRadius: '0.25rem' }}
                            />
                          )}
                        </td>
                      )}
                      <td style={{ padding: '0.75rem 1rem', color: '#111827' }}>{tester.email}</td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          background: '#dbeafe',
                          color: '#1e40af',
                        }}>
                          📱 {tester.platform}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        {getStatusBadge(tester.status)}
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        {tester.inviteEmailSent ? (
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            fontSize: '0.75rem',
                            color: '#16a34a',
                          }}>
                            <FontAwesomeIcon icon={faEnvelope} style={{ width: '0.75rem', height: '0.75rem' }} />
                            Sent
                          </span>
                        ) : (
                          <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>-</span>
                        )}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                        {tester.approvedAt 
                          ? new Date(tester.approvedAt).toLocaleString()
                          : new Date(tester.submittedAt || tester.createdAt).toLocaleString()
                        }
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                          {tester.status === 'pending' && (
                            <>
                              <button
                                onClick={() => approveTester(tester.id)}
                                title="Approve"
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.25rem',
                                  padding: '0.25rem 0.75rem',
                                  background: '#22c55e',
                                  color: 'white',
                                  borderRadius: '0.5rem',
                                  fontSize: '0.75rem',
                                  fontWeight: 600,
                                  border: 'none',
                                  cursor: 'pointer',
                                  transition: 'background 0.2s',
                                }}
                                onMouseEnter={(e) => e.target.style.background = '#16a34a'}
                                onMouseLeave={(e) => e.target.style.background = '#22c55e'}
                              >
                                <FontAwesomeIcon icon={faCheckCircle} style={{ width: '0.75rem', height: '0.75rem' }} />
                                Approve
                              </button>
                              <button
                                onClick={() => setRejectingId(tester.id)}
                                title="Reject"
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.25rem',
                                  padding: '0.25rem 0.75rem',
                                  background: '#ef4444',
                                  color: 'white',
                                  borderRadius: '0.5rem',
                                  fontSize: '0.75rem',
                                  fontWeight: 600,
                                  border: 'none',
                                  cursor: 'pointer',
                                  transition: 'background 0.2s',
                                }}
                                onMouseEnter={(e) => e.target.style.background = '#dc2626'}
                                onMouseLeave={(e) => e.target.style.background = '#ef4444'}
                              >
                                <FontAwesomeIcon icon={faTimesCircle} style={{ width: '0.75rem', height: '0.75rem' }} />
                                Reject
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => deleteTester(tester.id)}
                            title="Delete"
                            style={{
                              color: '#9ca3af',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              transition: 'color 0.2s',
                            }}
                            onMouseEnter={(e) => e.target.style.color = '#ef4444'}
                            onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
                          >
                            <FontAwesomeIcon icon={faTrash} style={{ width: '1rem', height: '1rem' }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Reject Modal */}
          {rejectingId && (
            <div style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 50,
            }}>
              <div style={{
                background: 'white',
                borderRadius: '1.5rem',
                padding: '2rem',
                maxWidth: '28rem',
                width: '100%',
                margin: '0 1rem',
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
                  Reject Application
                </h3>
                <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                  Provide an optional reason for rejection (will be included in email):
                </p>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="e.g., Beta program is full, or leave blank for generic message"
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '1rem',
                    marginBottom: '1rem',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0ea5e9'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={() => {
                      setRejectingId(null);
                      setRejectionReason('');
                    }}
                    style={{
                      flex: 1,
                      padding: '0.5rem 1rem',
                      background: '#e5e7eb',
                      color: '#374151',
                      borderRadius: '1rem',
                      fontWeight: 600,
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#d1d5db'}
                    onMouseLeave={(e) => e.target.style.background = '#e5e7eb'}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => rejectTester(rejectingId, rejectionReason)}
                    style={{
                      flex: 1,
                      padding: '0.5rem 1rem',
                      background: '#ef4444',
                      color: 'white',
                      borderRadius: '1rem',
                      fontWeight: 600,
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#dc2626'}
                    onMouseLeave={(e) => e.target.style.background = '#ef4444'}
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

import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';

const mockUser = {
  avatar: 'https://i.pravatar.cc/150?img=3',
  name: 'Amina Ibrahim',
  email: 'amina@example.com',
  role: 'Student',
};

const ProfilePage: React.FC = () => {
  const [name, setName] = useState(mockUser.name);
  const [avatar, setAvatar] = useState(mockUser.avatar);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwModal, setPwModal] = useState(false);
  const [pwSuccess, setPwSuccess] = useState('');
  const [pwError, setPwError] = useState('');
  const [pwLoading, setPwLoading] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) setAvatar(ev.target.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setShowModal(true);
    }, 1200);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPwError('');
    setPwSuccess('');
    setPwModal(false);
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPwError('All password fields are required.');
      setPwModal(true);
      return;
    }
    if (newPassword.length < 6) {
      setPwError('New password must be at least 6 characters.');
      setPwModal(true);
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwError('New passwords do not match.');
      setPwModal(true);
      return;
    }
    setPwLoading(true);
    setTimeout(() => {
      setPwLoading(false);
      setPwSuccess('Password changed successfully!');
      setPwModal(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 1200);
  };

  useEffect(() => {
    if (pwModal && (pwError || pwSuccess)) {
      const timer = setTimeout(() => {
        setPwModal(false);
        setPwError('');
        setPwSuccess('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [pwModal, pwError, pwSuccess]);

  return (
    <div className="container mx-auto max-w-xl p-4 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
      <Card className="w-full p-6 border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">My Profile</h2>
        <form onSubmit={handleSave} className="flex flex-col items-center gap-6">
          <div className="relative">
            <img
              src={avatar}
              alt="Avatar"
              className="h-28 w-28 rounded-full object-cover border-4 border-green-600 shadow"
            />
            <label className="absolute bottom-0 right-0 bg-green-600 text-white rounded-full p-2 cursor-pointer hover:bg-green-700 transition-colors">
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" /></svg>
            </label>
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full rounded-md border border-gray-300 py-2 px-3 bg-gray-100 text-gray-500 cursor-not-allowed"
              value={mockUser.email}
              disabled
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 py-2 px-3 bg-gray-100 text-gray-500 cursor-not-allowed"
              value={mockUser.role}
              disabled
            />
          </div>
          <Button
            variant="green"
            className="w-full mt-4"
            type="submit"
            isLoading={saving}
          >
            Save Changes
          </Button>
        </form>
      </Card>
      {/* Change Password Section */}
      <Card className="w-full p-6 border border-gray-200 mt-8">
        <h3 className="text-lg font-bold mb-4 text-gray-900">Change Password</h3>
        <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input
              type="password"
              className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input
              type="password"
              className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button
            className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white"
            type="submit"
            isLoading={pwLoading}
          >
            Change Password
          </Button>
        </form>
      </Card>
      <Modal
        open={pwModal}
        onClose={() => { setPwModal(false); setPwError(''); setPwSuccess(''); }}
        type={pwSuccess ? 'success' : 'error'}
      >
        {pwSuccess ? (
          <div className="flex flex-col items-center justify-center gap-2">
            {pwSuccess}
            {pwLoading && (
              <div className="mt-2 flex items-center justify-center">
                <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-green-500 border-t-transparent"></span>
              </div>
            )}
          </div>
        ) : pwError}
      </Modal>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        type="success"
      >
        Profile updated successfully!
      </Modal>
    </div>
  );
};

export default ProfilePage; 
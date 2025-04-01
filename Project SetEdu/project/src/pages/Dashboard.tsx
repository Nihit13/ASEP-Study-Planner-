import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { Calendar, Clock, LogOut } from 'lucide-react';

interface StudySession {
  id: string;
  title: string;
  subject: string;
  date: string;
  time: string;
  user_id: string;
}

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [newSession, setNewSession] = useState({
    title: '',
    subject: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: format(new Date(), 'HH:mm'),
  });

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    const { data, error } = await supabase
      .from('study_sessions')
      .select('*')
      .eq('user_id', user?.id)
      .order('date', { ascending: true });

    if (error) {
      toast.error('Failed to fetch study sessions');
    } else {
      setSessions(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.from('study_sessions').insert([
      {
        ...newSession,
        user_id: user?.id,
      },
    ]);

    if (error) {
      toast.error('Failed to create study session');
    } else {
      toast.success('Study session created!');
      fetchSessions();
      setNewSession({
        title: '',
        subject: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        time: format(new Date(), 'HH:mm'),
      });
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('study_sessions').delete().eq('id', id);

    if (error) {
      toast.error('Failed to delete study session');
    } else {
      toast.success('Study session deleted');
      fetchSessions();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-2 text-xl font-bold text-gray-900">Study Scheduler</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => signOut()}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Study Session</h3>
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      required
                      value={newSession.title}
                      onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      required
                      value={newSession.subject}
                      onChange={(e) => setNewSession({ ...newSession, subject: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      required
                      value={newSession.date}
                      onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                      Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      id="time"
                      required
                      value={newSession.time}
                      onChange={(e) => setNewSession({ ...newSession, time: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add Session
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Upcoming Study Sessions</h3>
            <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
              <ul role="list" className="divide-y divide-gray-200">
                {sessions.map((session) => (
                  <li key={session.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-gray-400" />
                          <p className="ml-2 text-sm font-medium text-indigo-600">{session.title}</p>
                        </div>
                        <button
                          onClick={() => handleDelete(session.id)}
                          className="ml-2 text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            Subject: {session.subject}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <p>
                            {format(new Date(`${session.date} ${session.time}`), 'PPP p')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
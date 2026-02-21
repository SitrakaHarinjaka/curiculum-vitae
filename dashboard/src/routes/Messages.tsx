import { useState, useEffect } from 'react';
import api from '../lib/api';
import { Contact } from '../lib/types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Mail, MailOpen, Trash2, Eye } from 'lucide-react';
import { Modal } from '../components/ui/Modal';
import { Pagination } from '../components/ui/Pagination';

export function Messages() {
  const [messages, setMessages] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Contact | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchMessages = (p = page) => {
    setLoading(true);
    api.get(`/admin/contacts?page=${p}&limit=10`)
      .then(res => {
        setMessages(res.data.data);
        setTotalPages(res.data.meta?.totalPages || 1);
        setTotal(res.data.meta?.total || 0);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchMessages(page); }, [page]);

  const markAsRead = async (id: number) => {
    await api.put(`/admin/contacts/${id}/read`);
    fetchMessages(page);
  };

  const deleteMessage = async (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!confirm('Supprimer ce message ?')) return;
    await api.delete(`/admin/contacts/${id}`);
    setSelected(null);
    fetchMessages(page);
  };

  const openMessage = (msg: Contact) => {
    setSelected(msg);
    if (!msg.isRead) markAsRead(msg.id);
  };

  if (loading && messages.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold" style={{ color: 'var(--text-heading)' }}>Messages ({total})</h1>

      <div className="rounded-xl" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
        {messages.length === 0 ? (
          <div className="p-8 text-center" style={{ color: 'var(--text-secondary)' }}>Aucun message</div>
        ) : (
          messages.map(msg => (
            <div
              key={msg.id}
              onClick={() => openMessage(msg)}
              className="flex items-start gap-4 p-4 cursor-pointer transition-colors hover:opacity-90"
              style={{ borderBottom: '1px solid var(--border-light)' }}
            >
              <div className="mt-1 shrink-0" style={{ color: msg.isRead ? 'var(--text-secondary)' : 'var(--accent)' }}>
                {msg.isRead ? <MailOpen size={18} /> : <Mail size={18} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-sm font-medium" style={{ color: msg.isRead ? 'var(--text-secondary)' : 'var(--text-heading)' }}>
                      {msg.name}
                    </span>
                    <span className="text-xs ml-2" style={{ color: 'var(--text-secondary)' }}>{msg.email}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {format(new Date(msg.createdAt), 'dd MMM yyyy HH:mm', { locale: fr })}
                    </span>
                    <button
                      onClick={(e) => deleteMessage(msg.id, e)}
                      className="p-1.5 rounded-lg transition-colors hover:bg-red-500/10 text-red-400 hover:text-red-300"
                      title="Supprimer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <p className="text-sm mt-1" style={{ color: msg.isRead ? 'var(--text-secondary)' : 'var(--text-primary)' }}>
                  {msg.subject}
                </p>
                <p className="text-xs mt-1 truncate" style={{ color: 'var(--text-secondary)' }}>{msg.message}</p>
              </div>
            </div>
          ))
        )}

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      {/* Detail modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.subject || 'Message'}>
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span style={{ color: 'var(--text-secondary)' }}>De:</span>
                <p style={{ color: 'var(--text-heading)' }}>{selected.name}</p>
              </div>
              <div>
                <span style={{ color: 'var(--text-secondary)' }}>Email:</span>
                <p style={{ color: 'var(--accent)' }}>{selected.email}</p>
              </div>
              <div>
                <span style={{ color: 'var(--text-secondary)' }}>Date:</span>
                <p style={{ color: 'var(--text-heading)' }}>{format(new Date(selected.createdAt), 'dd MMMM yyyy à HH:mm', { locale: fr })}</p>
              </div>
            </div>

            <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--bg-input)' }}>
              <p className="text-sm whitespace-pre-wrap" style={{ color: 'var(--text-primary)' }}>{selected.message}</p>
            </div>

            <div className="flex gap-2 justify-end">
              <a
                href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                <Eye size={16} /> Répondre
              </a>
              <button
                onClick={() => deleteMessage(selected.id)}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 text-sm"
              >
                <Trash2 size={16} /> Supprimer
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

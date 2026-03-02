'use client';

import { useState } from 'react';
import { Biography, SocialLink } from '@/lib/types';
import { postApi } from '@/lib/api';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Facebook, Linkedin, Globe, Dribbble } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';

const iconMap: Record<string, React.ElementType> = {
  facebook: Facebook,
  linkedin: Linkedin,
  upwork: Globe,
  behance: Globe,
  dribbble: Dribbble,
};

interface ContactSectionProps {
  biography: Biography | null;
  socialLinks: SocialLink[] | null;
}

export function ContactSection({ biography, socialLinks }: ContactSectionProps) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const { t } = useLocale();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const result = await postApi('/contacts', form);

    if (result.success) {
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } else {
      setStatus('error');
      setErrorMsg(result.message || t.contact.error);
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[linear-gradient(135deg,#240839_0%,#082252_70%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact info */}
          <div>
            <h2 className="text-2xl font-bold mb-8">{t.contact.info}</h2>
            <div className="space-y-6">
              <ContactItem
                icon={Mail}
                title={t.contact.mailUs}
                value={biography?.email || 'info@bluebase3.com'}
                href={`mailto:${biography?.email || 'info@bluebase3.com'}`}
              />
              <ContactItem
                icon={Phone}
                title={t.contact.contactUs}
                value={biography?.phone || '+1 504-899-822-457'}
                href={`tel:${biography?.phone || '+1504899822457'}`}
              />
              <ContactItem
                icon={MapPin}
                title={t.contact.location}
                value={biography?.address || '22 Baker Street Hangover, Stains W1U 3BW'}
              />
            </div>

            <div className="mt-10">
              <h3 className="text-lg font-semibold mb-4">{t.contact.social}</h3>
              <div className="flex gap-3">
                {socialLinks?.slice(0, 4).map(platform => {
                  const Icon = iconMap[platform.icon] || Globe;
                  return (<div
                    key={platform.id}
                    className="w-10 h-10 rounded-full bg-bg-card border border-border flex items-center justify-center text-text-secondary hover:bg-accent hover:text-bg-primary hover:border-accent transition-all cursor-pointer"
                  >
                     <a                      
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-bg-card border border-border flex items-center justify-center text-text-secondary hover:bg-accent hover:text-bg-primary hover:border-accent transition-all duration-300"
                      aria-label={platform.platform}
                    >
                       
                      <Icon className="p-1" size={28} />
                    </a>
                    {/* <span className="text-xs font-bold uppercase">{platform[0]}</span> */}
                  </div>)
                })}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h2 className="text-2xl font-bold mb-8">
              {t.contact.workTogether} <span className="text-accent">{t.contact.workTogetherAccent}</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={t.contact.yourName}
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 bg-bg-card border border-border rounded-lg text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent transition-colors"
                />
                <input
                  type="email"
                  placeholder={t.contact.yourEmail}
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 bg-bg-card border border-border rounded-lg text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <input
                type="text"
                placeholder={t.contact.yourSubject}
                required
                value={form.subject}
                onChange={e => setForm({ ...form, subject: e.target.value })}
                className="w-full px-4 py-3 bg-bg-card border border-border rounded-lg text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent transition-colors"
              />
              <textarea
                placeholder={t.contact.sendMessage}
                required
                rows={5}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 bg-bg-card border border-border rounded-lg text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent transition-colors resize-none"
              />

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 bg-accent text-bg-primary font-medium rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  t.contact.sending
                ) : (
                  <>
                    <Send size={16} /> {t.contact.submitNow}
                  </>
                )}
              </button>

              {status === 'success' && (
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <CheckCircle size={16} /> {t.contact.success}
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle size={16} /> {errorMsg}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon: Icon, title, value, href }: {
  icon: React.ElementType;
  title: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
        <Icon className="text-accent" size={20} />
      </div>
      <div>
        <p className="text-xs text-text-secondary uppercase tracking-wider mb-1">{title}</p>
        {href ? (
          <a href={href} className="text-accent hover:underline text-sm">{value}</a>
        ) : (
          <p className="text-text-primary text-sm">{value}</p>
        )}
      </div>
    </div>
  );
}

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Mail, MessageCircle, Linkedin, Github, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import Button from '../components/Button';
import { submitContactForm } from '../services/contactApi';
import { CONTACT_EMAIL, SOCIAL_LINKS } from '../utils/config';

const SERVICE_OPTIONS = [
  'Website', 'Web Application', 'Backend/API', 'MVP', 'AI/Automation',
  'Debugging', 'Deployment', 'Other',
];

const BUDGET_OPTIONS = [
  'Under ₹5,000', '₹5,000–₹15,000', '₹15,000–₹50,000', '₹50,000+', 'Not sure',
];

const initialForm = {
  name: '', email: '', phone: '', company: '', service: '', budget: '', message: '',
};

// Mirrors the backend's Bean Validation rules so people get instant feedback
// instead of a round-trip. The server still validates everything.
function validate(form) {
  const errors = {};
  const name = form.name.trim();
  const email = form.email.trim();
  const message = form.message.trim();

  if (!name) errors.name = 'Please enter your name.';
  else if (name.length < 2) errors.name = 'Name must be at least 2 characters.';

  if (!email) errors.email = 'Please enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email address.';

  if (form.phone.trim() && !/^[0-9+()\-\s]{6,20}$/.test(form.phone.trim())) {
    errors.phone = 'Use 6–20 digits; + ( ) - and spaces are allowed.';
  }

  if (!message) errors.message = 'Please describe your project.';
  else if (message.length < 20) errors.message = `Add a little more detail (${message.length}/20 characters).`;
  else if (message.length > 5000) errors.message = 'Please keep the description under 5,000 characters.';

  return errors;
}

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [fieldErrors, setFieldErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const submittingRef = useRef(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((fe) => ({ ...fe, [name]: undefined }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (submittingRef.current) return; // guard against double-clicks

    const errors = validate(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus('idle');
      setErrorMessage('');
      document.getElementById(Object.keys(errors)[0])?.focus();
      return;
    }

    submittingRef.current = true;
    setStatus('submitting');
    setErrorMessage('');
    setFieldErrors({});

    try {
      await submitContactForm({
        ...form,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        company: form.company.trim(),
        message: form.message.trim(),
      });
      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message);
      if (err.fieldErrors) setFieldErrors(err.fieldErrors);
    } finally {
      submittingRef.current = false;
    }
  }

  if (status === 'success') {
    return (
      <section className="container-x flex min-h-[70vh] flex-col items-center justify-center pb-16 pt-32 text-center">
        <SEO title="Contact" path="/contact" description="Get in touch with ANJORYX Technologies." />
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-tint-mint text-accent">
          <CheckCircle2 size={30} />
        </span>
        <h1 className="mt-6 font-display text-3xl font-semibold text-text">Thanks — message received.</h1>
        <p className="mt-3 max-w-md text-textMuted" role="status">
          We've received your project details and will get back to you soon.
        </p>
        <Button onClick={() => setStatus('idle')} variant="secondary" className="mt-8">
          Send another message
        </Button>
      </section>
    );
  }

  const submitting = status === 'submitting';

  return (
    <section className="pb-24 pt-32 sm:pt-40">
      <SEO
        title="Contact"
        path="/contact"
        description="Have an idea, project or technical challenge? Tell ANJORYX Technologies about it."
      />
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2"
        >
          <h1 className="headline-ink font-display text-4xl font-semibold leading-[1.05] text-text sm:text-5xl">
            Let's build what's next.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-textMuted sm:text-lg">
            Have an idea, project or technical challenge? Tell us about it.
          </p>

          <div className="mt-10 space-y-3">
            <ContactLink href={`mailto:${CONTACT_EMAIL}`} icon={Mail} label={CONTACT_EMAIL} external={false} />
            {SOCIAL_LINKS.whatsapp && <ContactLink href={SOCIAL_LINKS.whatsapp} icon={MessageCircle} label="WhatsApp" />}
            {SOCIAL_LINKS.linkedin && <ContactLink href={SOCIAL_LINKS.linkedin} icon={Linkedin} label="LinkedIn" />}
            {SOCIAL_LINKS.github && <ContactLink href={SOCIAL_LINKS.github} icon={Github} label="GitHub" />}
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit}
          noValidate
          aria-busy={submitting}
          className="card-surface p-6 sm:p-8 lg:col-span-3"
        >
          {status === 'error' && (
            <div
              role="alert"
              className="mb-6 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-300"
            >
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <span>
                {errorMessage}{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold underline">
                  Email us directly
                </a>{' '}
                if this keeps happening.
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Name" name="name" autoComplete="name" value={form.name} onChange={handleChange} error={fieldErrors.name} required />
            <Field label="Email" name="email" type="email" autoComplete="email" value={form.email} onChange={handleChange} error={fieldErrors.email} required />
            <Field label="Phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={handleChange} error={fieldErrors.phone} />
            <Field label="Company" name="company" autoComplete="organization" value={form.company} onChange={handleChange} error={fieldErrors.company} />

            <SelectField label="Service" name="service" value={form.service} onChange={handleChange} options={SERVICE_OPTIONS} />
            <SelectField label="Budget" name="budget" value={form.budget} onChange={handleChange} options={BUDGET_OPTIONS} />
          </div>

          <div className="mt-5">
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-text">
              Project description <span className="text-coral" aria-hidden="true">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
              aria-invalid={Boolean(fieldErrors.message)}
              aria-describedby={fieldErrors.message ? 'message-error' : undefined}
              placeholder="Tell us about your project, timeline, and goals..."
              className="field py-3"
            />
            {fieldErrors.message && (
              <p id="message-error" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                {fieldErrors.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={submitting} className="mt-7 w-full sm:w-auto">
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Sending…
              </>
            ) : (
              'Send project request'
            )}
          </Button>
        </motion.form>
      </div>
    </section>
  );
}

function ContactLink({ href, icon: Icon, label, external = true }) {
  const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <a
      href={href}
      {...ext}
      className="flex items-center gap-3 rounded-2xl border border-border/80 bg-surface px-4 py-3 text-sm font-medium text-text shadow-card transition-colors hover:border-accent/50 hover:text-accent"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-tint-sky text-accent">
        <Icon size={16} />
      </span>
      <span className="break-all">{label}</span>
    </a>
  );
}

function Field({ label, name, value, onChange, error, type = 'text', required = false, autoComplete }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-text">
        {label} {required && <span className="text-coral" aria-hidden="true">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className="field"
      />
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-text">
        {label}
      </label>
      <select id={name} name={name} value={value} onChange={onChange} className="field">
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

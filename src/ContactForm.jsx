import { useState} from 'react';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (name === '' || email === '' || message === '') {
      setFeedback('Completează toate câmpurile!');
    } else {
      setFeedback(`Mulțumim, ${name}!`);
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Contactează-ne</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Input pentru Nume */}
        <div style={{ marginBottom: '10px' }}>
          <label>Nume: </label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>

        {/* Input pentru Email */}
        <div style={{ marginBottom: '10px' }}>
          <label>Email: </label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>

        {/* Textarea pentru Mesaj */}
        <div style={{ marginBottom: '10px' }}>
          <label>Mesaj: </label>
          <textarea 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      {/* Afișarea feedback-ului */}
      {feedback && (
        <p style={{ marginTop: '15px', fontWeight: 'bold' }}>
          {feedback}
        </p>
      )}
    </div>
  );
};

export default ContactForm;
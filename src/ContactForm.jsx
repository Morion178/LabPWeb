import { useState} from 'react';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (name === '' || email === '' || message === '') {
      setFeedback('Completează toate câmpurile!');
      setIsSubmitted(false);
    } else {
      setFeedback(`Mulțumim, ${name}!`);
      setIsSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  const inputStyle = {
    width: '80%',
    padding: '10px',
    marginTop: '5px',
    border: '2px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box'
  };
  
  const labelStyle = {
    display: 'block',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '5px',
    fontSize: '14px'
  };
  
  const buttonStyle = {
    width: '80%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={{ padding: '30px', width: '100%', minHeight: '100vh', backgroundColor: '#f9f9f9', boxSizing: 'border-box' }}>
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '25px' }}>Contactează-ne</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Input pentru Nume */}
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Nume: </label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = '#007bff'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
        </div>

        {/* Input pentru Email */}
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Email: </label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = '#007bff'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
        </div>

        {/* Textarea pentru Mesaj */}
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Mesaj: </label>
          <textarea 
            value={message} 
            onChange={(e) => setMessage(e.target.value)}
            style={{...inputStyle, minHeight: '100px', resize: 'vertical'}}
            onFocus={(e) => e.target.style.borderColor = '#007bff'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
        </div>

        <button 
          type="submit"
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#0056b3';
            e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#007bff';
            e.target.style.boxShadow = 'none';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          Trimite
        </button>
      </form>

      {/* Afișarea feedback-ului */}
      {feedback && (
        <p style={{ 
          marginTop: '20px', 
          padding: '12px',
          borderRadius: '4px',
          fontWeight: 'bold',
          color: isSubmitted ? '#155724' : '#721c24',
          backgroundColor: isSubmitted ? '#d4edda' : '#f8d7da',
          border: `1px solid ${isSubmitted ? '#c3e6cb' : '#f5c6cb'}`
        }}>
          {feedback}
        </p>
      )}
    </div>
  );
};

export default ContactForm;
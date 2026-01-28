'use client';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Contact: React.FC = () => {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    phonenumber: '',
    message: '',
  });

  const [contactdetails, setContactDetails] = useState([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!formData.name || !formData.email || !formData.subject || !formData.phonenumber || !formData.message ) {
      toast.error("Please fill all fields");
      return;
    }
    try {
    
      const response = await fetch('/api/auth/contactdetailsadd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Contact details saved, we will contact you soon', );
        setContactDetails(data.companydetails);
        console.log('Submitted successfully:', data);
        setFormData({ name: '', email: '', subject: '', phonenumber: '', message: '' }); 
      } else {
        console.error('Failed to submit:', await response.text());
        toast.error('Failed to submit');
      }
    } catch (error) {
      console.error('Error submitting:', error);
      toast.error('please try again later');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <form onSubmit={handlesubmit}>
        <h1 className="text-2xl font-semibold mb-4">Get in Touch</h1>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded"
              placeholder="Full Name"
            />
          </div>
          <div className="col-span-6">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded"
              placeholder="Email Address"
            />
          </div>
          <div className="col-span-6">
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-2 rounded"
              placeholder="Subject"
            />
          </div>
          <div className="col-span-6">
            <input
              type="text"
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleChange}
              className="w-full p-2 rounded"
              placeholder="Phone Number"
            />
          </div>
          <div className="col-span-12">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full p-2 rounded"
              placeholder="Message"
            ></textarea>
          </div>
          <div className="col-span-12">
            <button
              type="submit"
              className="bg-black text-white p-4 rounded-2xl w-full"
            >
              Send Message
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Contact;

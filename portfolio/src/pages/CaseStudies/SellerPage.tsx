import { Link, useParams } from 'react-router-dom'
import './CleverCommerce.css'

const SellerPage = () => {
  const { sellerId } = useParams<{ sellerId: string }>()
  const sellerName = sellerId?.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ') || 'Seller'

  return (
    <div className="clever-commerce">
      <div className="cc-back-container">
        <Link to="/clever-commerce" className="cc-back-link" aria-label="Back to Cart">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Back to Cart</span>
        </Link>
      </div>

      <main className="cc-main">
        <div className="cc-content-container">
          <div style={{ padding: '64px 0' }}>
            <h1 style={{ 
              fontFamily: "'Merriweather', serif",
              fontSize: '30px',
              fontWeight: 400,
              color: '#303030',
              marginBottom: '24px'
            }}>
              {sellerName} Store
            </h1>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              color: '#303030',
              lineHeight: '1.5em'
            }}>
              This is a mockup seller page for {sellerName}. In a real application, this page would display the seller's profile, products, ratings, and other information.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SellerPage


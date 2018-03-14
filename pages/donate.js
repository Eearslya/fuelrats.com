// Component imports
import Page from '../components/Page'
import StripeDonation from '../components/StripeDonation'





// Component constants
const title = 'Donate'


const donate = () => (
  <div className="page-wrapper">
    <header className="page-header">
      <h1>{title}</h1>
    </header>

    <div className="page-content">
      <p>&laquo;DONATION_INTRO&raquo;</p>
      <h4>What are these donations for?</h4>
      <p>&laquo;DONATION_USAGE&raquo;</p>
      <h4>Submit a Donation</h4>
      <StripeDonation />
    </div>
  </div>
)





export default Page(donate, title)

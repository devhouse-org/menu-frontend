import logo from './assets/logo.jpg'

function App() {
  return (
    <> 
      <div className="w-screen flex flex-col items-center p-4">
        <div className='w-full flex justify-center'>
          <img src={logo} alt='Logo' className='w-28'/>
        </div>

        <h1 className='pt-3'>We hope your meal was as delightful as you hoped!</h1>
        <h1 className='text-red-400'>نأمل أن تكون وجبتك كانت ممتعة كما تمنيت</h1>

      </div>
    </>
  )
}

export default App;

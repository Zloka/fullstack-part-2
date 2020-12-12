const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }
  
  const { message, success } = notification;

  return (
    <div className={success ? 'success' : 'error'}>
      {message}
    </div>
  )
}

export default Notification;
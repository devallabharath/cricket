import Modal from './modal'

const styles = {
  container: 'w-full flex flex-col justify-between items-center',
  body: 'flex-auto flex-col gap-1 items-center',
  buttons: 'h-fit flex flex-row gap-1 justify-evenly items-center',
}

const Dialog = ({ title, children, hide, yes, no }) => {
  return (
    <Modal title={title} hide={hide}>
      <div className={styles.container}>
        <div className={styles.body}>{children}</div>
        <div className={styles.buttons}>
          <button onClick={no ? no.func : hide}>{no.title}</button>
          <button onClick={yes.func}>{yes.title}</button>
        </div>
      </div>
    </Modal>
  )
}

export default Dialog

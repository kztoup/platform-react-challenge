const boxStyle = (isDownSm: boolean) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: isDownSm ? '75%' : 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  maxHeight: '700px',
  overflow: 'auto',
})

export { boxStyle }

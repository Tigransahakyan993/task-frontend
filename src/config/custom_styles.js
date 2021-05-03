export const styles = {
  ModalCustomStyles : {
    content : {
      top                   : '52.5%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      minHeight             : '80vh',
      minWidth              : '80%',
      backgroundColor       : '#fff',
      alignItems            : 'center',
      justifyContent        :'center',
      display               : 'flex'
    },
    overlay : {
      backgroundColor: 'grey',
      zIndex: 1000,
    },
  },
  CarouselCustomStyles : {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: {max: 4000, min: 3000},
      items: 5
    },
    desktop: {
      breakpoint: {max: 3000, min: 1024},
      items: 6
    },
    tablet: {
      breakpoint: {max: 1024, min: 464},
      items: 2
    },
    mobile: {
      breakpoint: {max: 464, min: 0},
      items: 1
    }
  }
}
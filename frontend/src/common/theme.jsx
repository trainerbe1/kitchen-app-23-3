const themes = {
    textfield: 'w-full mb-2 px-3 py-1 rounded bg-slate-600 outline-none focus:ring text-white',
    modalStyle: {
        overlay: {
          background: "rgba(33, 35, 47, 0.7)",
        },
        content: {
          border: 0,
          width: '700px',
          background: '#1f2937',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          boxShadow: 'var(0 0 #0000, 0 0 #0000), var(0 0 #0000, 0 0 #0000), 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          transform: 'translate(-50%, -50%)',
        }
    },
    selectDropdown: {
      singleValue: (base, state) => ({
        ...base,
        color: 'whitesmoke'
      }),
      control: (base, state) => ({
        ...base,
        background: "#475569",
        border: 'none',
        }),
        menu: base => ({
          ...base,
          background: "#475569",
          border: 'none',
      }),
      menuList: base => ({
        ...base,
      })
    }
};

export default themes;
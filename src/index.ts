let listenersSetUp = false;
let toggleEnabled = true;


export async function init() {
  

  if (!listenersSetUp) {
    const metadata = await miro.board.getAppData('autoToggle');
    console.log("meta", metadata);

    miro.board.ui.on('icon:click', async () => {
      await miro.board.ui.openPanel({url: 'app.html'});
    });

    miro.board.ui.on('selection:update', async ({event}) => {
      const selection = await miro.board.getSelection();
      const metadata = await miro.board.getAppData('autoToggle');

      if (metadata){
        debugger
        toggleEnabled = metadata.enabled;
      };


      if (selection.length === 1 && toggleEnabled) {
        const item = selection[0];
        if (item.linkedTo){
          item.goToLink();
          miro.board.deselect({
            id: item.id,
          });
        }
      }
    });

    listenersSetUp = true;
  }
}

init();
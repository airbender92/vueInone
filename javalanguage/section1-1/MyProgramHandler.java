
public class MyProgramHandler extends ToolBase {
  protected File dir;
  protected int port;

  public MyProgramHandler() {
    this.registerHandler(new ArgHandlerDir() {
      @Override
      public void setDir(File dir) {
        this.dir = dir;
      }
    });
    this.registerHandler(new ArgHandlerInt(){
      @Override
      public String[] getTagArgs() {
        return new String[]{"port"};
      }
      @Override
      public void setInt(int value) {
        this.port = value;
      }
    })
  }
}

public static void main(String[] args) {
  MyProgramHandler myShell = new MyProgramHandler();
  if(myShell.processArgs(args)) {
    System.out.println(String.format("port: %d; dir: %s", myShell.getPort(), myShell.getDir()));
  }
  System.exit(1);
}
public class GooglePackage implements ReactPackage {
   @Override
   public List<ViewManager>      createViewManagers(ReactApplicationContext reactContext) {
     return Collections.emptyList();
   }
   @Override
   public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
       List<NativeModule> modules = new ArrayList<>();
       modules.add(new GoogleModule(reactContext));
       return modules;
    }
}

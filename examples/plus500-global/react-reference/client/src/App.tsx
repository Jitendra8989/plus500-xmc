import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Pages
import HomePage from "@/pages/HomePage";
import TradingCryptocurrencies from "@/pages/TradingCryptocurrencies";
import FeesCharges from "@/pages/FeesCharges";
import AboutUs from "@/pages/AboutUs";
import DFSAccount from "@/pages/DFSAccount";
import Reviews from "@/pages/Reviews";
import TradingAcademy from "@/pages/TradingAcademy";
import RiskManagement from "@/pages/RiskManagement";
import ComponentExporter from "@/pages/ComponentExporter";
import ComponentLibrary from "@/pages/ComponentLibrary";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/trading/cryptocurrencies" component={TradingCryptocurrencies} />
      <Route path="/help/feescharges" component={FeesCharges} />
      <Route path="/aboutus" component={AboutUs} />
      <Route path="/aboutus/dfsaaccount" component={DFSAccount} />
      <Route path="/aboutus/reviews" component={Reviews} />
      <Route path="/tradingacademy" component={TradingAcademy} />
      <Route path="/help/riskmanagement" component={RiskManagement} />
      <Route path="/tools/component-exporter" component={ComponentExporter} />
      <Route path="/tools/component-library" component={ComponentLibrary} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

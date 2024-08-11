"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "stripe-pricing-table": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}

const PricingPage = () => {
    return (
        <>
            <div className="p-10">
                <div className="overflow-hidden rounded-2xl bg-[#dbeafe] py-10">
                    <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
                    <stripe-pricing-table className="overflow-hidden rounded" pricing-table-id="prctbl_1OUjW6SBw7CFN4Fg3PV96Thl" publishable-key="pk_live_51OIUWISBw7CFN4FgLKl2xJ2h3ckJojgaWW05kXdTB466DRDh8n7WiUeKCv0wBxIPuR1zWNZPlYrlCaiZ7Sikd1LA00cQco8HA9"></stripe-pricing-table>
                </div>
            </div>

            <h2 className="my-10 text-center text-3xl font-bold text-default-800">Frequently Asked Questions</h2>
            <div className="mx-auto w-full max-w-3xl relative">
                <Accordion variant="bordered" className="border border-divider">
                    <AccordionItem key="1" title="Can I request a refund?" aria-label="Can I request a refund?" classNames={{ content: "mb-2" }}>
                        {"If you are not satisfied with our service, you can request a refund to customer support within 15 days of your purchase. We will refund your money without any questions asked. Currently we give refund only in annual plan. Keep in mind that when we refund your money, a portion of the price usually 3% is deducted due to the transition fee provided to our third party service provider."}
                    </AccordionItem>
                    <AccordionItem key="2" title="Can I cancel my subscription?" aria-label="Can I cancel my subscription?" classNames={{ content: "mb-2" }}>
                        {"You can cancel your subscription at any time. If you cancel your subscription, you will not be charged for the next billing cycle. You can still use the service until the end of the current billing cycle."}
                    </AccordionItem>
                </Accordion>
            </div>
        </>
    );
};

export default PricingPage;

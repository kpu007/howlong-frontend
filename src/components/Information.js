import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Information = () => {
    return (
        <div className="App" alignItems="center">
            <div>
                <div class="center" style={{width:"80%"}}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            What does this site do?
                        </AccordionSummary>
                        <AccordionDetails>
                            <div style={{textAlign:"left"}}>
                                This web application tracks the progress of Professional Sports Authenticators (PSA), one of the largest grading companies in the world. Essentially, it just scrapes, stores, and displays this data. It is not affiliated in any way with PSA.
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            What are the listed dates?
                        </AccordionSummary>
                        <AccordionDetails>
                            <div style={{textAlign:"left"}}>
                                These are PSA's "Complete-Through Dates" (CTDs).<br/><br/>
                                The pandemic caused an enormous flood of submissions to such companies, which in turn caused them to switch to the CTD system instead of just listing estimated speed of a tier (since they'd fallen too far behind for said estimates to work). Said system lists the date that all orders for a tier have been "completed through" - for instance, if the earliest order for tier A was registered on February 11, then the CTD is February 10, as no open orders exist up until and including that date. (It should be noted that these dates are based on registration time, which may have been weeks after physical arrival depending on tier and time sent in.) <br/><br/>
                                CTDs are updated daily on PSA's website (<a href="https://www.psacard.com/pricing">https://www.psacard.com/pricing</a>), but data for past CTDs aren't tracked, which makes progress hard to visualize sometimes. Fortunately, it's possible to archive these CTDs.
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            What are the tables on this site?
                        </AccordionSummary>
                        <AccordionDetails>
                            <div style={{textAlign:"left"}}>
                                The Progress Table displays the current CTDs, as well as how they compare to those of the past week. It also includes the progress in the past 15 and 30 days.<br/><br/>
                                The Archive Table displays the CTDs for any given date, provided they're in this site's database.
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </div>
    )
}

export default Information;
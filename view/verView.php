<?php
use Spipu\Html2Pdf\Html2Pdf;
use Spipu\Html2Pdf\Exception\Html2PdfException;
use Spipu\Html2Pdf\Exception\ExceptionFormatter;

try {
 ob_start();
 require_once $archivo;
 $html = ob_get_clean();
 
 $html2pdf = new Html2Pdf("P","A4","es",true,"UTF-8");
 //$html2pdf->setDefaultFont('Arial');
 $html2pdf->writeHTML($html);
 $html2pdf->Output('otro.pdf');
} catch (Html2PdfException $e) {
 $html2pdf->clean();
 $formateo = new Html2PdfException($e);
 echo $formateo->getHtmlMessage();
}
?>
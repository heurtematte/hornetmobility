<%@ taglib uri="/struts-tags" prefix="s"%>
<%@ page contentType="application/ms-excel" pageEncoding="UTF-8"%>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
            xmlns:x="urn:schemas-microsoft-com:office:excel"
            xmlns="http://www.w3.org/TR/REC-html40">
<head>
    <META http-equiv="Content-Type" content="text/html; charset=utf-8" >
    <meta name="ProgId" content="Excel.Sheet" >
    <meta name="Generator" content="Microsoft Excel 11" >
<!--[if gte mso 9]>
	<xml>
	 <o:DocumentProperties>
	  <o:Author>Hornet MAE</o:Author>
	  <o:LastAuthor>Hornet MAE</o:LastAuthor>
	  <o:Created>2007-11-15T10:40:04Z</o:Created>
	  <o:LastSaved>2007-11-15T10:40:19Z</o:LastSaved>
	  <o:Company>MAE</o:Company>
	  <o:Version>11.8132</o:Version>
	 </o:DocumentProperties>
	 <o:OfficeDocumentSettings>
	  <o:RelyOnVML/>
	  <o:AllowPNG/>
	  <o:TargetScreenSize>1024x768</o:TargetScreenSize>
	 </o:OfficeDocumentSettings>
	</xml>
<![endif]-->
<style>
	<!--
	table 
	    {mso-displayed-decimal-separator:"\,";
	    mso-displayed-thousand-separator:" ";}
	@page
	    {margin:.98in .79in .98in .79in;
	    mso-header-margin:.49in;
	    mso-footer-margin:.49in;}
	tr
	    {mso-height-source:auto;}
	col
	    {mso-width-source:auto;}
	br
	    {mso-data-placement:same-cell;}
	.style0
	    {mso-number-format:General;
	    text-align:general;
	    vertical-align:bottom;
	    white-space:nowrap;
	    mso-rotate:0;
	    mso-background-source:auto;
	    mso-pattern:auto;
	    color:windowtext;
	    font-size:10.0pt;
	    font-weight:400;
	    font-style:normal;
	    text-decoration:none;
	    font-family:Verdana;
	    mso-generic-font-family:auto;
	    mso-font-charset:0;
	    border:none;
	    mso-protection:locked visible;
	    mso-style-name:Normal;
	    mso-style-id:0;}
	td, th
	    {mso-style-parent:style0;
	    padding-top:1px;
	    padding-right:1px;
	    padding-left:1px;
	    mso-ignore:padding;
	    color:windowtext;
	    font-size:10.0pt;
	    font-weight:400;
	    font-style:normal;
	    text-decoration:none;
	    font-family:Verdana;
	    mso-generic-font-family:auto;
	    mso-font-charset:0;
	    mso-number-format:General;
	    text-align:general;
	    vertical-align:bottom;
	    border:none;
	    mso-background-source:auto;
	    mso-pattern:auto;
	    mso-protection:locked visible;
	    white-space:nowrap;
	    mso-rotate:0;}
	    
	.xl24
	    {mso-style-parent:style0;
	    mso-number-format:"Short Date";}
	    
	.xl49
	    {mso-style-parent:style0;
	    text-align:left;
	    vertical-align:middle;
	    border-top:.5pt solid windowtext;
	    border-right:.5pt solid windowtext;
	    border-bottom:none;
	    border-left:.5pt solid windowtext;
	    background:silver;
	    mso-pattern:black none;
	    white-space:normal;}
	
	-->
</style>
<!--[if gte mso 9]>
<xml>
 <x:ExcelWorkbook>
  <x:ExcelWorksheets>
   <x:ExcelWorksheet>
    <x:Name>Feuil1</x:Name>
    <x:WorksheetOptions>
     <x:DefaultColWidth>10</x:DefaultColWidth>
     <x:Selected/>
     <x:Panes>
      <x:Pane>
       <x:Number>3</x:Number>
       <x:ActiveRow>10</x:ActiveRow>
       <x:ActiveCol><s:property value="exportTable.nbColumns" />
       </x:ActiveCol>
      </x:Pane>
     </x:Panes>
     <x:ProtectContents>False</x:ProtectContents>
     <x:ProtectObjects>False</x:ProtectObjects>
     <x:ProtectScenarios>False</x:ProtectScenarios>
    </x:WorksheetOptions>
   </x:ExcelWorksheet>
   <x:ExcelWorksheet>
    <x:Name>Feuil2</x:Name>
    <x:WorksheetOptions>
     <x:DefaultColWidth>10</x:DefaultColWidth>
     <x:ProtectContents>False</x:ProtectContents>
     <x:ProtectObjects>False</x:ProtectObjects>
     <x:ProtectScenarios>False</x:ProtectScenarios>
    </x:WorksheetOptions>
   </x:ExcelWorksheet>
   <x:ExcelWorksheet>
    <x:Name>Feuil3</x:Name>
    <x:WorksheetOptions>
     <x:DefaultColWidth>10</x:DefaultColWidth>
     <x:ProtectContents>False</x:ProtectContents>
     <x:ProtectObjects>False</x:ProtectObjects>
     <x:ProtectScenarios>False</x:ProtectScenarios>
    </x:WorksheetOptions>
   </x:ExcelWorksheet>
  </x:ExcelWorksheets>
  <x:WindowHeight>12525</x:WindowHeight>
  <x:WindowWidth>15435</x:WindowWidth>
  <x:WindowTopX>360</x:WindowTopX>
  <x:WindowTopY>120</x:WindowTopY>
  <x:ProtectStructure>False</x:ProtectStructure>
  <x:ProtectWindows>False</x:ProtectWindows>
 </x:ExcelWorkbook>
</xml>
<![endif]-->
</head>


<body link="blue" vlink="purple" class="xl26">


<table border="0" cellpadding="0" cellspacing="0">

    <%-- Titres --%>
    <thead>
        <tr>
		    <s:iterator value="exportTable.columnsTitles" >
		    <th class="xl49"><s:property/></th>
		    </s:iterator>
        </tr>
    </thead>
	<%-- pour chaque ligne --%>
	<tbody>
	<s:iterator value="exportTable.rows" >
		<tr>
		<s:iterator value="cols" >
			<s:if test="format.equalsIgnoreCase('DATE')">
			<td class="xl24"><s:date name="value" format="dd/MM/yyyy" /></td>
			</s:if>
			<s:elseif test="format.equalsIgnoreCase('BOOLEEN')">
            <td>
                <s:if test="value != null && value">oui</s:if>
                <s:elseif test="value != null && !value">non</s:elseif>
            </td>
            </s:elseif>
            <s:elseif test="format.equalsIgnoreCase('NUMERIQUE') && value != null">
			<td align="right" x:num="${value}"><s:property value="value" /></td>
			</s:elseif>
			<s:elseif test="format.equalsIgnoreCase('NUMERIQUE') && value == null">
            <td></td>
            </s:elseif>
            <s:else>
            <td><s:property value="value" /></td>
            </s:else>
		</s:iterator>
		</tr>
    </s:iterator>
    </tbody>
</table>
import { NextResponse } from 'next/server';
import {prisma} from '@/lib/utils';

const referralCodes = [
    'DKB4SD', 'UQO6UC', 'USONND', 'E1DQH3', 'F880PJ', 'QQR6ZV', 'BGV57Z', '3P42EA',
    'ILQTCU', 'MFLHDD', '0UN1L2', 'XVDHEP', 'LYSHP6', 'UNKSU4', 'FQQO3H', 'P2BWG0',
    'N7T87J', '2HSYL8', 'GRJP59', '1GODS2', 'JXNY5C', 'PXNEJ2', 'BM6CZU', 'X0TWLF',
    '8L1QYL', 'DUZ141', 'Y6AUZK', 'B5HAPA', 'ENOS08', 'Y5UUSZ', 'H5NEJK', 'IDRCTM',
    '07XDI8', 'RFK756', 'FQCDSK', '7GL9UW', '5EHW4C', 'B4340D', '3AB0VV', 'OX3O1W',
    'CL28PS', '89BX5D', 'N47W7L', 'LMU2YJ', 'J5VEE4', 'XK57DV', 'STJCA8', 'PJD2DG',
    '1F0JR3', 'EEGGFH', '0NYWNE', 'OGAE8G', '6AR48K', 'HATBLG', 'KRDYER', '5XB68K',
    'KV2H3Y', '0X27ZG', '8LDEVW', 'NKVYL3', 'L2FPYY', 'AD0VED', 'FBJC1W', 'YZ3WTK',
    'AB8U10', '21SHNT', 'FJ5SOD', 'W4DD4X', '6JQAS1', 'DK1IAO', 'ZQWEEC', 'MQ25V3',
    'MXI1RZ', '03AFQI', '697F97', '3PWD6R', 'V0V31C', 'PLBDEH', 'IVCB1Z', 'AY5CBQ',
    '6B3XNK', 'OF5FP4', '84IW38', 'JX5ZK0', 'ZN991K', 'N7CKPR', 'B5WT4Y', '2WSX3B',
    'AYYZLN', 'SFVS55', '3AIIFP', 'ETYA4F', 'Y1V23H', 'ORCJDC', '4DYRYD', 'O5YIZA',
    'J25HHC', '7JVPHR', 'WS6NVX', 'JR9UJP', 'GEON1A', 'BSUE3W', 'YGTCHV', '78EHE1',
    '6VPLA0', '2BF68X', 'SHPJNS', 'W9FA0B', '91CJG4', 'A2J73H', 'QCN5U7', 'ED4CK1',
    'DS0DH0', 'BRDF2V', 'OKAA9J', 'OB6RRE', 'KEYF5Z', 'WBAPV0', 'Q1S841', 'QK6G5A',
    'NP82C3', 'V7LY2L', '25ND41', 'ZR67VX', '7EQ7TD', 'S2AC0F', '6DXEW9', 'K1NOVY',
    'XLKMQO', 'BY8T33', 'R9GBUK', '99N14Y', 'USGRUW', 'D9EBGW', 'EIAQ8M', 'Y1P48S',
    'PIGPWV', 'MPQGUR', 'R4284F', '69G3OD', '91KKUU', '4T4P6U', '3NTOB7', '96HMG5',
    'OR0BY5', 'CQUB5O', 'VEBGGK', '5ODQ9F', 'A25MXC', 'WW2ZGT', 'DOMY86', 'X0D1MH',
    'GHX4PI', '7O343A', '9NOY1M', 'ZAHTZS', 'NAKEXL', '2ONW8O', 'JG06NP', '16X00N',
    'MDUJ94', '76N05A', 'CWHL7R', 'WS61M0', 'RZCN4W', '4E377I', 'HP885K', 'F42W4T',
    'L2SVYO', 'TO8BHD', 'QM2PQL', 'NRC1F6', 'R2U2W0', '5I0LOY', 'MVV4YS', 'D1ZW6J',
    'YOP95Z', 'XP1DPS', '6MYMX8', '3RNXSM', '1DNDON', 'PV33NX', 'VQFWWG', 'ZQ6ADE',
    'WOMH2S', '81JUUG', 'L8M9HT', 'XE6GEM', '0DTAZE', '6GNTNL', 'MXJCZ0', 'PGNIDE',
    'QDQS2T', '21P5ZR', 'A0QD8A', 'NLBO76', 'Y48N20', 'KJ09YV', 'F1ZLFY', '668AGQ',
    '5TRTUH', '3TFB7L', 'UDQ45Z', 'D0JQZP', 'QOG19U', '3JV6UU', 'BZ0Y3S', 'ZKWVLD',
    'G7SSRS', 'YZGRHL', '8AIFLM', 'K9TBFS', 'BJOCI9', '8LRXWU', 'F4WEP7', 'CFKTT4',
    '84NFGX', 'EWGRUC', 'EE4VLW', 'L902F4', 'B5QBRK', 'YPM0WX', 'AX8HTN', 'MINQMZ',
    'Q0IGYQ', 'CXM6KY', 'SB0SPY', '6I67WT', 'G9K8JL', 'JQ5VB0', '39G8H9', 'Z6LZ7R',
    'KA7854', 'YPL1V3', 'W42447', 'A2ZR72', 'W6QCDP', 'QV7OLK', '4YGED9', '6MF8YL',
    '0XN0I2', '49G59H', 'FMA9OE', '2C91IJ', '4HGNDM', '3O7WJT', '172UOQ', 'M6BLED',
    'XQ8IQK', 'K8KQBE', 'N2CVLK', 'WR9WWY', 'TTQJ5D', 'GU3JNR', 'JLJOBM', '71WA6C',
    'DKNMO3', 'OKG3WM', '337R1O', '7F0OBC', 'VBPKXJ', 'W0NJQH', 'AZ47BO', '37X3RI',
    '2W3BV0', '1EL0HJ', 'FVVI8K', '1LY0NZ', 'ZVA092', 'IYXNZW', '9R3127', '6I2MY0',
    '129ETA', '42GOX3', 'DH0CF8', 'P2G11S', 'D1ROVO', 'IQLUCL', '5Z5ESU', 'PG1AI3',
    'VZKGF8', '7NHPJX', 'ADWQN1', 'HI1TV9', 'DBCB5R', 'AB3RFK', '4N8VHZ', 'OZHDF8',
    '7P9X2F', 'R6F5KY', 'ZYAP92', '6L4Q6S', 'GDM8D7', '3IIKW7', 'YIUAMO', 'S8DL8W',
    'TI97C8', 'KYD5EY', 'C6D4PT', '0PR4V7', 'WT8BQR', '57RBXU', '0N9V8X', '3PBNRX',
    'D360PR', '4USOD4', 'G4VW7X', 'WMLYDS', 'I7HYHC', '8X4IBW', 'IHO7AK', 'JM17WQ',
    'C197XJ', 'JP529G', 'PH71MR', 'B0RNIR', 'C5F9AH', 'XFMFU7', 'B6IO4B', '6RW08Z',
    'Y51CVZ', '5IS4QB', '0QZDS7', 'CTGNX5', '84JFU2', 'D3BUIX', 'MVLHKT', 'PBOWU1',
    'O90C6X', '29UJN4', '1APJ9Z', '1MF3ME', 'ECG67Z', 'TT3XR8', 'K6RH57', '7R42RY',
    'U29CNJ', 'Z0O1V2', 'ROHEJV', '9B560F', 'Z9HOVR', 'FZUB8A', '2V4Y1J', 'X9W8OZ',
    '7MVAHA', 'INYH62', 'BNHYKC', '85AUQ1', 'YMDLC0', 'FK294D', 'KF9QF4', 'HUX5U0',
    '8LSD2O', 'RZTJC7', 'PJN801', 'MAMQNB', 'WCWAMN', 'UIQTS6', 'Q0O9UN', 'VVF1IE',
    'EP0WNN', '6MH5UU', '7DTLCY', '1ZFRYG', 'IY1PFA', '9HSPVG', 'IJJIVV', '1MOQ7K',
    'FXVPZZ', 'M7JSE0', '0QSRZ0', 'D0ORBZ', 'Z2554O', 'FV0DWK', 'ZZLQK0', '93XBYQ',
    'QKJHMR', '1S8L7A', 'DTTMIA', 'CVSUVZ', 'VTOFTQ', '3XXQYC', 'JN1ZXZ', 'AVW9SA',
    'JSOIZZ', '4ZO12A', '1JJGZU', 'O28Z0Y', 'J2VXGA', 'C2MWSX', '3BSYH5', 'ADKBES',
    'I54ZVW', 'C2GDBO', 'CNA8N7', '8H8IZT', 'SYYYTA', '7WS7GH', '6RF2NZ', 'O3MG5Q',
  'L6DNY3', 'OWRAKR', 'U8A4HV', 'BMV9YA', 'HOUNQ8', '0LCROF', 'EUR4B7', '6LOA5Y',
  'PDXQPK', 'L5LFIF', 'TJSHYO', 'RBWA7D', '42AJ6W', 'F3HFP3', 'H5WNCF', 'YV8MW4',
  'JHRI5T', '01CN6G', 'QK348V', 'U3WB8K', 'AZWCF2', 'JRO0QO', '53038E', '7HZIV4',
  'FCGEPP', 'H3IBN9', 'L0QK73', 'KWQYBA', 'CDDV4L', 'R21QNZ', '6Y9H9A', 'AVRFGL',
  'A09TS3', 'SOHM5E', '31VE3U', 'NF9BRM', 'YKJ47G', 'K44XDN', '4EVJ3T', '869A4W',
  'AA65DY', '8YXGAW', 'JHXBLR', 'X0TRKE', 'YBX7QC', 'I7R59M', 'GV2KL0', '0KTD6T',
  'G9IPY5', 'NEMKUQ', 'OMGMR9', '0FFC73', 'B3EK8P', 'UA66WY', 'S1BGUU', 'GX2E8J',
  'HU2PEU', '2GM0ZS', 'K15FF6', '850EEI', 'VEMWQH', 'DI8CFA', 'IWBI5X', 'O94OJE',
  'VN1HCI', 'NOHJ5F', 'HO3IK1', 'LQXJMB', 'CNH2NR', 'MW6BQA', 'SAM8G6', 'RBOLJF',
  '6XPVT6', '2YMJK9', 'P2912J', '8W5VL2', 'G246XL', 'TFBT76', 'PA6FV5', 'JO83PA',
  '69JPYA', 'OTDI17', '5L97JL', 'LP863Y', 'VX1ESK', '5E4S3C', '25FLVK', 'ZFD4S1',
  'UNFU9G', 'IP8YVZ', 'T6R4O9', 'F5UUGE', 'SQBJF2', 'J2ZTPR', 'IN1456', 'XZVSGM',
  'K2Q997', 'EFL4SG', 'LGQWOR', '36I4TI'
];


export async function GET() {
    try {
        // Create entries for all referral codes
        const createdCodes = await prisma.waitlist.createMany({
            data: referralCodes.map(code => ({
                referral_code: code,
                used: false
            })),
            skipDuplicates: true // Skip if the referral code already exists
        });
        
        return NextResponse.json({ 
            success: true, 
            message: `Created ${createdCodes.count} new referral codes`,
        }, { status: 200 });

    } catch (error) {
        console.error('Error creating referral codes:', error);
        return NextResponse.json({ 
            success: false, 
            error: 'Failed to create referral codes' 
        }, { status: 500 });
    }
}
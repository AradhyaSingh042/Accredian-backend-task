const prisma = require("../models/prisma");
const { sendReferralEmail } = require("../config/nodemailer");
const { z } = require("zod");

function validateData(referrerData, refereeData) {
  const referrerSchema = z.object({
    referrerName: z.string().trim(),
    referrerEmail: z.string().email().trim(),
    referrerPhone: z.string().trim(),
    referrerCode: z.string().trim(),
  });

  const refereeSchema = z.object({
    refereeName: z.string().trim(),
    refereeEmail: z.string().email().trim(),
    refereePhone: z.string().trim(),
    refereeCode: z.string().trim(),
  });

  const referrerResult = referrerSchema.safeParse(referrerData);
  const refereeResult = refereeSchema.safeParse(refereeData);

  if (refereeResult.success && refereeResult.success) {
    return true;
  }

  return false;
}

exports.pushData = async (req, res) => {
  try {
    const {
      referrerName,
      referrerEmail,
      referrerPhone,
      referrerCode,
      refereeName,
      refereeEmail,
      refereePhone,
      refereeCode,
    } = req.body;

    const referrerData = {
      referrerName,
      referrerEmail,
      referrerPhone,
      referrerCode,
    };

    const refereeData = {
      refereeName,
      refereeEmail,
      refereePhone,
      refereeCode,
    };

    // data validation
    if (!validateData(referrerData, refereeData)) {
      return res.status(400).json({
        success: false,
        message: "Data Validation Failed",
      });
    }

    // add referrer data
    const createdReferrer = await prisma.referrer.create({
      data: {
        name: referrerName,
        email: referrerEmail,
        phone: referrerPhone,
        referral_code: referrerCode,
      },
    });

    // add referee data
    const createdReferee = await prisma.referee.create({
      data: {
        name: refereeName,
        email: refereeEmail,
        phone: refereePhone,
        referral_code: refereeCode,
        referrerId: createdReferrer.id,
      },
    });

    // send successful response
    res.status(200).json({
      success: true,
      data: {
        createdReferrer,
        createdReferee,
      },
      message: "Data Stored Successfully",
    });

    // send successful email
    sendReferralEmail(referrerEmail, refereeEmail, refereeCode);
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e.message,
      message: "Internal Server Error",
    });
  }
};
